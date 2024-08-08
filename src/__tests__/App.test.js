// src/__tests__/App.test.js
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import { server } from "../mocks/server";
import { rest } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock the API response
const mockDogImage = "https://images.dog.ceo/breeds/bulldog-english/mami.jpg";

server.use(
  rest.get('https://dog.ceo/api/breeds/image/random', (req, res, ctx) => {
    return res(ctx.json({ message: mockDogImage }));
  })
);

test("displays the dog image after fetching", async () => {
  render(<App />);
  
  // Check for the loading message
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();

  // Wait for the image to appear and verify its source
  const img = await screen.findByAltText("A Random Dog");
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(mockDogImage);
});

test("displays a loading message before fetching", async () => {
  render(<App />);

  // Ensure the loading message is initially in the document
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();

  // Wait for the image to appear and check that the loading message is no longer present
  const img = await screen.findByAltText("A Random Dog");
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(mockDogImage);
  
  // Ensure the loading message is not in the document anymore
  expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument();
});
