import { render, fireEvent, screen } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import Page from "./+page.svelte";
import axios from "axios";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { updateUrlParameter } from "../lib/index";
import AxiosMockAdapter from "axios-mock-adapter";

vi.mock("../lib/index", () => ({
  updateUrlParameter: vi.fn(),
  fetchPokemon: vi.fn().mockResolvedValue({
    results: [],
  }),
}));

const mockedCalculateOffsetForDirection = vi.fn((direction: string) => {
  return direction === "next" ? 20 : 0;
});

vi.mock("./page.svelte", () => ({
  calculateOffsetForDirection: mockedCalculateOffsetForDirection,
}));

describe("Page Component Tests", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios);
  });

  it("mocks an axios call", async () => {
    const responseData = { results: [] };
    mock.onGet("/pokemon").reply(200, responseData);
    render(Page);
    const response = await axios.get("/pokemon");
    expect(response.data).toEqual(responseData);
    expect(response.status).toBe(200);
  });

  it("handles navigation buttons correctly", async () => {
    render(Page);
    await fireEvent.click(screen.getByText("Next"));
    expect(updateUrlParameter).toHaveBeenCalledWith(20, 20);
    vi.clearAllMocks();
    await fireEvent.click(screen.getByText("Previous"));
    expect(updateUrlParameter).toHaveBeenCalledWith(0, 20);
  });

  it("works correctly for next direction", () => {
    expect(mockedCalculateOffsetForDirection("next")).toBe(20);
  });

  it("works correctly for previous direction", () => {
    expect(mockedCalculateOffsetForDirection("previous")).toBe(0);
  });
});
