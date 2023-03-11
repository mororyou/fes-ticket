import { useMutateAuth } from '@/hooks/auth/useMutate'
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title
} from '@mantine/core'
import { FormEvent, useState } from 'react'

const Auth = () => {

  const [isLogin, setIsLogin] = useState(true)
  const { email, setEmail, password, setPassword, loginMutation, registerMutation } =
    useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  return (
    <Container className="w-11/12 md:w-1/2 lg:w-1/3">
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome Libecity Fes!
      </Title>
      <form onSubmit={handleSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<'a'> onClick={(e) => console.log(e)} size="sm">
              Forgot password?
            </Anchor>
          </Group>
          
          <Button fullWidth mt="xl" type='submit'>
            {isLogin ? "Sign in" : "Sign Up"}
          </Button>
          
          <div className='flex items-center justify-end'>
            <span className='mt-4 text-sm cursor-pointer' onClick={() => {
              setIsLogin(!isLogin)
            }}>Change Mode</span>
          </div>
        </Paper>
      </form>
    </Container>
  )
}

export default Auth
