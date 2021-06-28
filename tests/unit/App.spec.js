import URL from "@/components/Url";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
const renderWithVuetify = (component, options, callback) => {
  return render(
    component,
    {
      vuetify: new Vuetify(),
      ...options,
    },
    callback
  );
};

const server = setupServer(
  rest.post("/url", (req, res, ctx) => {
    return res(ctx.json({ url: "http://hello.com" }));
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe("App", () => {
  it("display shortened url in text field when 'shorten' is clicked", async () => {
    renderWithVuetify(URL, {
      props: { purpose: "shorten" },
    });
    const shortenBtn = await screen.findByRole("button", {
      name: /shorten/i,
    });
    const searchField = screen.getByPlaceholderText(/enter url/i);
    userEvent.type(searchField, "h");
    userEvent.click(shortenBtn);
    await waitFor(() => {
      expect(searchField).toHaveValue("http://hello.com");
    });
  });
});
