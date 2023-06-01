import ClientLayout from '@/layout/client'
import Title from '@/components/common/Title'
import { getApplies } from '@/fetch/apply'
import { getSchedules } from '@/fetch/schedule'
import { Apply, Event } from '@/types/types'
import { useAuthContext } from '@/context/AuthContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Paper } from '@mantine/core'
import { IconCalendarEvent, IconExternalLink } from '@tabler/icons'
import dayjs from 'dayjs'
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const localizer = dayjsLocalizer(dayjs)

const DnDCalendar = withDragAndDrop(Calendar)

const resourceMap = [
  { resourceId: 1, resourceTitle: 'ブース１' },
  { resourceId: 2, resourceTitle: 'ブース２' },
]

const Schedules = () => {
  const [date, setDate] = useState(new Date(2023, 6, 15))
  const [schedules, setSchedules] = useState<Event[]>([])
  const [applies, setApplies] = useState<Apply[]>([])

  const { currentUser } = useAuthContext()

  useEffect(() => {
    const f = async () => {
      if (currentUser !== undefined && currentUser?.boothId !== null) {
        const datestring = dayjs(date).format('YYYY-MM-DD')
        const res_scd = await getSchedules(datestring)
        await setSchedules(res_scd)
        const res_apply = await getApplies(currentUser?.boothId, datestring)
        await setApplies(res_apply)
      }
    }
    f()
  }, [date, currentUser])

  // react-big-calendar custom useCallback function
  const startAccessor = useCallback((event: any) => new Date(event.start), [])
  const endAccessor = useCallback((event: any) => new Date(event.end), [])
  const resourceIdAccessor = useCallback((event: any) => event.resourceId, [])
  const resourceTitleAccessor = useCallback((obj: any) => obj.resourceTitle, [])
  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])
  const onResizeEvent = useCallback(
    ({ event, start, end }: { event: any; start: any; end: any }) => {
      setSchedules((prev: Event[]): Event | any => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
      // DB更新関数
    },
    [setSchedules]
  )
  const onEventDrop = useCallback(
    ({ event, start, end }: { event: any; start: any; end: any }) => {
      setSchedules((prev: Event[]): Event | any => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
      // DB更新関数
    },
    [setSchedules]
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
                resizable
                selectable
                defaultView={Views.DAY}
                views={['day']}
                formats={formats}
                messages={messages}
                defaultDate={defaultDate}
                events={schedules}
                localizer={localizer}
                resources={resourceMap}
                showMultiDayTimes={true}
                step={15}
                min={new Date(2023, 7, 15, 9, 30)}
                max={new Date(2023, 7, 17, 21)}
                startAccessor={startAccessor}
                endAccessor={endAccessor}
                resourceIdAccessor={resourceIdAccessor}
                resourceTitleAccessor={resourceTitleAccessor}
                onEventDrop={onEventDrop}
                onEventResize={onResizeEvent}
                onNavigate={onNavigate}
              />
            </Paper>
            <div className="row-span-1 max-h-[25vh] overflow-y-scroll">
              <h3 className="col-span-1 mb-8 border-b border-b-gray-400 p-2 text-base font-semibold text-gray-700">
                申込者一覧
              </h3>
              <div className="grid grid-cols-4 gap-4 px-2">
                {applies &&
                  applies.map((apply: Apply) => {
                    return (
                      <Paper
                        key={apply.id}
                        className="col-span-1 grid h-16 w-full cursor-move grid-cols-12 grid-rows-2 gap-5 p-4"
                        p={'md'}
                        shadow="md"
                      >
                        <p className="col-start-1 col-end-9 row-start-1 row-end-2 text-sm">
                          {apply.name}
                        </p>

                        {apply.url && (
                          <a
                            href={apply.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-start-9 col-end-13 row-start-1 row-end-3 flex items-center justify-end"
                          >
                            <IconExternalLink size={32} />
                          </a>
                        )}
                        <span className="col-start-1 col-end-9 row-start-2 row-end-3 text-xs">
                          {apply.time}
                        </span>
                      </Paper>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Schedules
