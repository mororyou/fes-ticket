import ClientLayout from '@/layout/client'
import Title from '@/components/common/Title'
import { getApplies } from '@/fetch/apply'
import { getSchedules } from '@/fetch/schedule'
import { Apply, Event } from '@/types/types'
import { useAuthContext } from '@/context/AuthContext'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Paper } from '@mantine/core'
import { IconCalendarEvent } from '@tabler/icons'
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
          {/* <Paper shadow="xs" p="md"> */}
          <div className="grid grid-cols-12 gap-x-4">
            <Paper p="md" shadow="xs" className="col-span-8">
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
            </Paper>
            <div className="col-span-4">
              <h3 className="col-span-1 mb-8 border-b border-b-gray-400 p-2 text-base font-semibold text-gray-700">
                申込者一覧
              </h3>
              <div className="grid grid-cols-1 gap-y-4">
                {applies &&
                  applies.map((apply: Apply) => {
                    return (
                      <Paper
                        key={apply.id}
                        className="col-span-1 grid h-16 w-full grid-cols-12 p-4"
                        p={'md'}
                        shadow="md"
                      >
                        <h5>{apply.name}</h5>
                      </Paper>
                    )
                  })}
              </div>
            </div>
          </div>
          {/* </Paper> */}
        </div>
      </div>
    </ClientLayout>
  )
}

export default Schedules
