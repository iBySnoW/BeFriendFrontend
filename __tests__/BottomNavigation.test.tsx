import { render, screen } from "@testing-library/react"
import { usePathname } from "next/navigation"
import RootLayout from "../app/layout"

// Mock the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}))

describe("BottomNavigation", () => {
  it("should render BottomNavigation on home page", () => {
    ;(usePathname as jest.Mock).mockReturnValue("/")
    render(
      <RootLayout>
        <div>Home Page</div>
      </RootLayout>,
    )
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })

  it("should not render BottomNavigation on onboarding page", () => {
    ;(usePathname as jest.Mock).mockReturnValue("/onboarding")
    render(
      <RootLayout>
        <div>Onboarding Page</div>
      </RootLayout>,
    )
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("should not render BottomNavigation on auth page", () => {
    ;(usePathname as jest.Mock).mockReturnValue("/auth")
    render(
      <RootLayout>
        <div>Auth Page</div>
      </RootLayout>,
    )
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })
})
