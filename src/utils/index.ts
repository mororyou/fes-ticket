import Router from "next/router"

export const roleLocation = (role: string | undefined) => {
  if (role === "client") {
    Router.push('/client/dashboard')
  } else if (role === "administrator") {
    Router.push('/admin/dashboard')
  } else {
    Router.push('/')
  }
}