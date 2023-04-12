import { getApply } from "@/fetch/apply";
import { getBooth } from "@/fetch/booth";
import { Apply, Booth } from "@/types/types";
import { Button, Divider, Paper } from "@mantine/core";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const uuid = ctx.params?.id as string
  const apply:Apply = await getApply(uuid)
  const booth:Booth = await getBooth(apply.booth)
  return {
    props: {
      uuid: uuid,
      apply: apply,
      booth: booth
    }
  }
}

type Props = {
  uuid: string
  apply: Apply
  booth: Booth
}

const ApplyComplete: FC<Props> = ({
  uuid, apply, booth
}) => {
  const contents = apply.contents as []
  return (
    <Paper shadow={'sm'} p="md" m={'md'}>
      <p className="text-sm font-semibold">以下の内容で申し込みが完了しました。</p>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-y-3 md:gap-y-5">
        <p className="text-sm font-semibold col-span-1 text-gray-800 border-b border-gray-200">
          ■ ブース名
        </p>
        <p className="text-sm col-span-1 md:col-span-4 pl-2">
          {booth.name}
        </p>

        <p className="text-sm font-semibold col-span-1 text-gray-800 border-b border-gray-200">
          ■ 申込者名
        </p>
        <p className="text-sm col-span-1 md:col-span-4 pl-2">
          { apply.name }
        </p>

        <p className="text-sm font-semibold col-span-1 text-gray-800 border-b border-gray-200">
          ■ プロフィールURL
        </p>
        <p className="text-sm col-span-1 md:col-span-4 pl-2">
          { apply.url }
        </p>

        <p className="text-sm font-semibold col-span-1 text-gray-800 border-b border-gray-200">
          ■ 日時
        </p>
        <p className="text-sm col-span-1 md:col-span-4 pl-2">
          { apply.date } - {apply.time ? apply.time : "未指定"}
        </p>
        {contents && contents.map((record: any, index: number) => {
          return (
            <div key={index} className="col-span-1 md:col-span-5 flex flex-col w-full grid-cols-1 md:grid-cols-5" >
              <p className="text-sm font-semibold col-span-1 text-gray-800 border-b border-gray-200">
                ■ {record.label}
              </p>
              <div className="text-sm col-span-1 md:col-span-4 pl-2">
                {typeof record.value !== 'object' ? (
                  <>
                    {record.value}
                  </>
                ) : (
                  <p className="flex flex-wrap gap-x-3 items-center">
                   {record.value && record.value.map((_val: any, idx: number) => (
                     <span key={idx} className="py-1 px-4 bg-gray-400 rounded-sm text-white">
                      {_val}
                      </span>
                   ))}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center md:justify-start my-12">
        <Link href={`/apply/edit/${apply.uuid}`}>
          <Button size="sm" color={'green'} radius={"xs"}>
            編集する
          </Button>
        </Link>
      </div>
    </Paper>
  )
}

export default ApplyComplete