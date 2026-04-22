// This file is still a work-in-progress
// For now, there is a "Hello, world" test

import { Hono } from "hono"

const app = new Hono()
app.get("/", c => c.text("Hello, world"))

export default app