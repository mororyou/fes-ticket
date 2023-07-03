import ClientLayout from '@/layout/client'
import Title from '@/components/common/Title'
import { RESOUCE_MAPS } from '@/constant/const'
import ApplyItem from '@/components/client/schedule/Apply'
import { useQueryClient } from 'react-query'
import { useScheduleMutate } from '@/hooks/schedule/useMutate'
import { useApplyMutate } from '@/hooks/apply/useMutate'
import { Apply, Schedule } from '@/types/types'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Paper } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarEvent } from '@tabler/icons'

import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const DnDCalendar = withDragAndDrop(Calendar)

import dayjs from 'dayjs'
import { getSchedules } from '@/fetch/schedule'
import { getAppliesView, updateStatusApplies } from '@/fetch/apply'
import DetailModal from '@/components/client/schedule/DetailModal'
const localizer = dayjsLocalizer(dayjs)

const Schedules = () => {
  const [date, setDate] = useState(new Date(2023, 6, 15))
  const [applies, setApplies] = useState<Apply[]>([])
  const [schedules, setScheduls] = useState<Schedule[]>([])
  const [draggedEvent, setDraggedEvent] = useState<any>(null)
  const [opend, { open, close }] = useDisclosure(false)
  const [apply, setApply] = useState<any>(null)

  const { createSchedule, updatedSchedule } = useScheduleMutate()
  const { updatedApply } = useApplyMutate()

  const queryClient = useQueryClient()

  const getData = async () => {
    const tmpDate = dayjs(date).format('YYYY-MM-DD')
    const applyRes: Apply[] = await getAppliesView(tmpDate)
    await setApplies(applyRes)
    const scheduleRes: Schedule[] = await getSchedules(tmpDate)
    await setScheduls(scheduleRes)
  }

  useEffect(() => {
    getData()
  }, [date])

  // react-big-calendar custom hook function
  const startAccessor = useCallback((event: any) => new Date(event.start), [])
  const endAccessor = useCallback((event: any) => new Date(event.end), [])
  const resourceIdAccessor = useCallback((event: any) => event.resourceId, [])
  const resourceTitleAccessor = useCallback((obj: any) => obj.resourceTitle, [])
  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])

  const onEventDrop = useCallback(
    async ({ event, start, end }: { event: any; start: any; end: any }) => {
      const dropData = event
      dropData.start = start
      dropData.end = end
      const prevSchedules = queryClient.getQueryData<Schedule[]>(['schedules'])
      if (prevSchedules) {
        queryClient.setQueryData(
          ['schedules'],
          prevSchedules.map((sdl) => (sdl.id === event.id ? dropData : sdl))
        )
      }
      // Schedule Update 処理
      await updatedSchedule.mutate({
        id: dropData.id,
        title: dropData.title,
        user: dropData.user,
        date: dayjs(dropData.date).format('YYYY-MM-DD'),
        start: dayjs(dropData.start).format('YYYY-MM-DD HH:mm'),
        end: dayjs(dropData.end).format('YYYY-MM-DD HH:mm'),
        resourceId: dropData.resourceId,
        url: dropData.url,
        email: dropData.email,
        contents: dropData.contents,
        designer: dropData.designer,
        categories: dropData.categories,
        content: dropData.content,
        etc: dropData.etc,
        status: dropData.status,
        engineer: dropData.engineer,
      })
    },
    [queryClient, updatedSchedule]
  )
  const eventPropGetter = useCallback(
    (event: any) => ({
      ...(event.isDraggable
        ? { className: 'isDraggable' }
        : { className: 'nonDraggable' }),
    }),
    []
  )
  const onDragOver = useCallback(
    (dragEvent: any) => {
      if (draggedEvent !== 'undroppable') {
        dragEvent.preventDefault()
      }
    },
    [draggedEvent]
  )
  const onDropFromOutside = useCallback(
    async (event: any) => {
      if (draggedEvent === 'undroppable') {
        setDraggedEvent(null)
        return
      }
      try {
        await Promise.all([
          // スケジュール登録
          createSchedule.mutate({
            title: draggedEvent.name,
            user: draggedEvent.name,
            date: dayjs(event.start).format('YYYY-MM-DD'),
            start: dayjs(event.start).format('YYYY-MM-DD HH:mm'),
            end: dayjs(event.end).format('YYYY-MM-DD HH:mm'),
            resourceId: event.resource,
            email: draggedEvent.email,
            url: `${draggedEvent.url}`,
            contents: draggedEvent?.contents,
            categories: draggedEvent?.categories,
            content: draggedEvent?.content,
            etc: draggedEvent?.etc,
            status: 1,
            engineer: '',
            designer: '',
          }),
          updateStatusApplies(draggedEvent.id, 2),
        ])
        await getData()
      } catch (error) {
        // エラーハンドリング
        console.error(error)
      }
    },
    [draggedEvent, createSchedule, updatedApply]
  )
  //
  const onDragStart = useCallback((event: any) => setDraggedEvent(event), [])

  const onDoubleClickEvent = useCallback(
    (event: Object): void => {
      open()
      setApply(event)
    },
    [open]
  )

  // react-big-calendar custom useMemo
  const { defaultDate, formats, messages } = useMemo(
    () => ({
      defaultDate: date,
      messages: {
        next: '翌日',
        today: '当日',
        previous: '前日',
      },
      formats: {
        dayHeaderFormat: (date: any, culture: any, localizer: any) =>
          localizer.format(date, 'M月D日', culture),
      },
    }),
    [date]
  )

  return (
    <ClientLayout title="スケジュール設定">
      <Title
        title="スケジュール設定"
        icon={<IconCalendarEvent className="mr-2" />}
      />

      <div className="grid grid-cols-12 gap-4">
        {/* Left Column */}
        <Paper
          p="md"
          radius="sm"
          shadow="xs"
          className="col-span-8 max-h-[75vh]"
        >
          <DnDCalendar
            defaultView={Views.DAY}
            views={['day']}
            formats={formats}
            messages={messages}
            defaultDate={defaultDate}
            events={schedules}
            localizer={localizer}
            resources={RESOUCE_MAPS}
            showMultiDayTimes={true}
            step={30}
            min={new Date(2023, 7, 15, 9, 0)}
            max={new Date(2023, 7, 17, 21, 0)}
            eventPropGetter={eventPropGetter}
            startAccessor={startAccessor}
            endAccessor={endAccessor}
            resourceIdAccessor={resourceIdAccessor}
            resourceTitleAccessor={resourceTitleAccessor}
            onNavigate={onNavigate}
            onDropFromOutside={onDropFromOutside}
            onDragOver={onDragOver}
            onDoubleClickEvent={onDoubleClickEvent}
            onEventDrop={onEventDrop}
            resizable={false}
            selectable
          />
        </Paper>

        {/* Right Column */}
        <Paper
          p="md"
          radius="sm"
          shadow="xs"
          className="col-span-4 max-h-[75vh] overflow-y-scroll bg-gray-100"
        >
          <h3 className="col-span-1 mb-8 border-b border-b-gray-400 p-2 text-base font-semibold text-gray-700">
            申込者一覧
          </h3>
          <div className="grid grid-cols-1 gap-4 px-2">
            {applies &&
              applies.map((apply: Apply) => (
                <ApplyItem
                  apply={apply}
                  onDragStart={onDragStart}
                  key={apply.id}
                />
              ))}
          </div>
        </Paper>
      </div>
      <DetailModal opend={opend} close={close} apply={apply} />
    </ClientLayout>
  )
}

export default Schedules
