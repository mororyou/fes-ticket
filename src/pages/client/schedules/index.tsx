import Title from '@/components/common/Title'
import { useAuthContext } from '@/context/AuthContext'
import { getApplies } from '@/fetch/apply'
import { getSchedules } from '@/fetch/schedule'
import ClientLayout from '@/layout/client'
import { Apply, Event } from '@/types/types'
import { Paper } from '@mantine/core'
import { IconCalendarEvent } from '@tabler/icons'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
        const res_apply = await getApplies(currentUser?.boothId, datestring)
        setSchedules(res_scd)
        setApplies(res_apply)
        console.log(res_scd)
      }
    }

    f()
  }, [date])

  // const moveEvent = useCallback(
  //   ({
  //     event,
  //     start,
  //     end,
  //     resourceId,
  //     isAllDay: droppedOnAllDaySlot = false,
  //   }: {
  //     event: any
  //     start: any
  //     end: any
  //     resourceId: number
  //     isAllDay: any
  //   }) => {
  //     const { allDay } = event
  //     if (!allDay && droppedOnAllDaySlot) {
  //       event.allDay = true
  //     }
  //     setSchedules((prev) => {
  //       const existing = prev.find((ev: Event) => ev.id === event.id) ?? {}
  //       const filtered = prev.filter((ev: Event) => ev.id !== event.id)
  //       return [...filtered, { ...existing, start, end, resourceId, allDay }]
  //     })
  //   },
  //   [setSchedules]
  // )

  // const resizeEvent = useCallback(
  //   ({ event, start, end }: { event: any; start: any; end: any }) => {
  //     setSchedules((prev) => {
  //       const existing = prev.find((ev) => ev.id === event.id) ?? {}
  //       const filtered = prev.filter((ev) => ev.id !== event.id)
  //       return [...filtered, { ...existing, start, end }]
  //     })
  //   },
  //   [setSchedules]
  // )

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate])

  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: date,
      messages: {
        next: '翌日',
        today: '当日',
        previous: '前日',
      },
    }),
    []
  )

  return (
    <ClientLayout title="スケジュール設定">
      <Title
        title="スケジュール設定"
        icon={<IconCalendarEvent className="mr-2" />}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Paper shadow="xs" p="md">
            <div className="grid grid-cols-12 gap-x-4">
              <div className="col-span-8">
                <DnDCalendar
                  defaultDate={defaultDate}
                  defaultView={Views.DAY}
                  views={['day']}
                  events={schedules}
                  localizer={localizer}
                  resizable
                  resources={resourceMap}
                  messages={messages}
                  selectable
                  showMultiDayTimes={true}
                  step={30}
                  // onEventDrop={moveEvent}
                  // onEventResize={resizeEvent}
                  onNavigate={onNavigate}
                  startAccessor={(event: any) => {
                    return new Date(event.start)
                  }}
                  endAccessor={(event: any) => {
                    return new Date(event.end)
                  }}
                  resourceIdAccessor={(event: any) => {
                    return event.resourceId
                  }}
                  resourceTitleAccessor={(obj: any) => {
                    return obj.resourceTitle
                  }}
                />
              </div>
              <Paper className="col-span-4">Event List</Paper>
            </div>
          </Paper>
        </div>
      </div>
    </ClientLayout>
  )
}

export default Schedules
