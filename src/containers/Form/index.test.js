import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Wait for the "En cours" text
      await screen.findByText("En cours");

      // Wait for the button's value to change back to "Envoyer"
      await waitFor(() => {
        const button = screen.getByTestId("button-test-id");
        expect(button.value).toBe("Envoyer");
      }, { timeout: 5000 }); // Increase the timeout if needed

      expect(onSuccess).toHaveBeenCalled();
    });
  });
});