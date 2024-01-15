import { loginUser } from "../api/ApiRequests";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(),
  })
);

describe("loginUser", () => {
  it("should return data on successful login", async () => {
    const email = "avaliacaoflutter";
    const password = "56576892080";

    const result = await loginUser(email, password);

    expect(result).toBeDefined();
  });

  it("should throw an error on incorrect email or password", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({ message: "Incorrect email or password." }),
      })
    );

    const email = "incorrect@example.com";
    const password = "wrongpassword";

    await expect(loginUser(email, password)).rejects.toThrow(
      "Incorrect email or password. Please try again."
    );
  });

  it("should throw an error on network or server issues", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    const email = "avaliacaoflutter";
    const password = "56576892080";

    await expect(loginUser(email, password)).rejects.toThrow(
      "Something went wrong. Please try again."
    );
  });
});
