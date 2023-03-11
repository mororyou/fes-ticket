import ClientLayout from "@/layout/client";
import { GetServerSideProps } from "next";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      code: context.params?.code
    }
  }
}

type Props = {
  code: string
}

const ErrorPage:FC<Props> = ({code}) => {
  return (
    <ClientLayout title={"error page"} error={true}>
      <>Error {code}</>
    </ClientLayout>
  )
}

export default ErrorPage