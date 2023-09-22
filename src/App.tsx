import { Container } from "@mui/material"
import { Form, List } from "./components"

function App() {
  return (
    <>
      <Container fixed sx={{
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        py: 3,
        gap:3
      }}>
        <Form></Form>
        <List></List>
      </Container>
    </>
  )
}

export default App
