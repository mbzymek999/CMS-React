import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DisplayMessagesController from "../components/admin/message/display-messages.component";

test("get request work corretly", async () => {
    render(<DisplayMessagesController />);
    const users = await screen.findByText("nazwa firmy");
    expect(users).toBeVisible();
});