import ClientLayout from '@/layout/client'
import Title from '@/components/common/Title'
import { useQueryClient } from 'react-query'
import { useScheduleMutate } from '@/hooks/schedule/useMutate'
import { useApplyMutate } from '@/hooks/apply/useMutate'
import { useQuerySchedules } from '@/hooks/schedule/useQuerySchedules'
import { useQueryApplies } from '@/hooks/apply/useQueryApplies'
import { useQueryClientSelector } from '@/hooks/client/useQueryClientSelector'
import { Apply, Schedule, Client } from '@/types/types'
import { useCallback, useMemo, useState } from 'react'

import { Button, Modal, Paper, Select } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarEvent, IconExternalLink } from '@tabler/icons'

import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const DnDCalendar = withDragAndDrop(Calendar)

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { RESOUCE_MAPS } from '@/constant/const'
import ApplyItem from '@/components/client/schedule/Apply'
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')
const localizer = dayjsLocalizer(dayjs)

const Schedules = () => {
  const [date, setDate] = useState(new Date(2023, 6, 15))
  const [draggedEvent, setDraggedEvent] = useState<any>(null)
  const [opend, { open, close }] = useDisclosure(false)
  const [event, setEvent] = useState<any>(null)
  const [engineer, setEnginner] = useState<string | null>('')
  const [designer, setDesigner] = useState<string | null>('')

  const { createSchedule, updatedSchedule } = useScheduleMutate()
  const { updatedApply } = useApplyMutate()

  const queryClient = useQueryClient()
  const { data: schedules, refetch: refetchSchedule } = useQuerySchedules()
  const { data: applies, refetch: refetchApply } = useQueryApplies(
    dayjs(date).format('YYYY-MM-DD')
  )
  const { data: clients } = useQueryClientSelector()

  // react-big-calendar custom hook function
  const startAccessor = useCallback((event: any) => new Date(event.start), [])
  const endAccessor = useCallback((event: any) => new Date(event.end), [])
  const resourceIdAccessor = useCallback((event: any) => event.resourceId, [])
  const resourceTitleAccessor = useCallback((obj: any) => obj.resourceTitle, [])
  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onResizeEvent = useCallback(
    async ({ event, start, end }: { event: any; start: any; end: any }) => {
      const resizeData = event
      resizeData.start = start
      resizeData.end = end
      const prevSchedules = queryClient.getQueryData<Schedule[]>(['schedules'])
      if (prevSchedules) {
        queryClient.setQueryData(
          ['schedules'],
          prevSchedules.map((sdl) => (sdl.id === event.id ? resizeData : sdl))
        )
      }
      // Schedule Update 処理
      // updatedSchedule()
    },
    [queryClient]
  )
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
      // updatedSchedule()
    },
    [queryClient]
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
      await createSchedule.mutate({
        title: draggedEvent.name,
        user: draggedEvent.name,
        date: dayjs(event.start).format('YYYY-MM-DD'),
        start: dayjs(event.start).tz().format('YYYY-MM-DD HH:mm'),
        end: dayjs(event.end).tz().format('YYYY-MM-DD HH:mm'),
        resourceId: event.resource,
        email: draggedEvent.email,
        url: `/client/receptions/${draggedEvent.uuid}`,
        contents: draggedEvent?.contents,
        engineer: '',
        designer: '',
      })
      await updatedApply.mutate({
        id: draggedEvent.id,
        dates: draggedEvent.dates,
        date_details: draggedEvent.date_details,
        name: draggedEvent.name,
        email: draggedEvent.email,
        url: draggedEvent.url,
        contents: draggedEvent.contents,
        status: 2,
      })
      // refetch
      await refetchSchedule()
      await refetchApply()
      setDraggedEvent(null)
    },
    [draggedEvent, createSchedule, updatedApply, refetchSchedule, refetchApply]
  )
  //
  const onDragStart = useCallback((event: any) => setDraggedEvent(event), [])

  const onDoubleClickEvent = useCallback(
    (event: Object): void => {
      open()
      setEvent(event)
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
        <div className="col-span-12">
          <div className="grid grid-cols-1 gap-y-4">
            <Paper p="md" shadow="xs" className="row-span-1 max-h-[50vh]">
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
                onEventResize={onResizeEvent}
                resizable
                selectable
              />
            </Paper>
            <div className="row-span-1 max-h-[25vh] overflow-y-scroll">
              <h3 className="col-span-1 mb-8 border-b border-b-gray-400 p-2 text-base font-semibold text-gray-700">
                申込者一覧
              </h3>
              <div className="grid grid-cols-4 gap-4 px-2">
                {applies &&
                  applies.map((apply: Apply) => (
                    <ApplyItem
                      key={apply.id}
                      apply={apply}
                      onDragStart={onDragStart}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal opened={opend} onClose={close} title="詳細" size="lg">
        <div className="mb-8 grid grid-cols-12 gap-x-8 gap-y-4">
          <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
            日付
          </label>
          <div className="col-span-8 my-auto text-sm text-gray-700">
            {dayjs(event?.start).format(' YYYY/MM/DD')}
          </div>
          <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
            時間
          </label>
          <div className="col-span-8 text-sm text-gray-700">
            {dayjs(event?.start).format('HH:mm')} -{' '}
            {dayjs(event?.end).format('HH:mm')}
          </div>
          <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
            担当者
          </label>
          <div className="col-span-8 my-auto text-sm text-gray-700">
            <Select data={clients as []} onChange={setEnginner} />
          </div>
          <label className="font-sm col-span-4 my-auto font-semibold text-gray-700">
            担当者
          </label>
          <div className="col-span-8 my-auto text-sm text-gray-700">
            <Select data={clients as []} onChange={setDesigner} />
          </div>
        </div>
        <Button type="button">スケジュール詳細登録</Button>
      </Modal>
    </ClientLayout>
  )
}

export default Schedules
