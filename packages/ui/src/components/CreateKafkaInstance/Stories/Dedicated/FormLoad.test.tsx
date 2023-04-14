import { userEvent } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { waitFor } from "@testing-library/react";
import { renderDialog, waitForI18n, within } from "../../../../test-utils";
import * as stories from "./FormLoad.stories";

const {
  QuotaAvailableOnFormLoad,
  TrialAvailableOnFormLoad,
  OutOfQuotaOnFormLoad,
  TrialUnavailableOnFormLoad,
  TrialUsedOnFormLoad,
  ErrorOnFormLoad,
  UnableToRetrieveSizes,
  GotEmptySizes,
} = composeStories(stories);

describe("CreateDedicatedKafkaInstance", () => {
  it("should show a form for standard instances with no alerts", async () => {
    const onCreate = jest.fn();
    const comp = renderDialog(<QuotaAvailableOnFormLoad onCreate={onCreate} />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(comp.queryAllByRole("alert")).toHaveLength(0);
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(comp.getByRole("button", { name: "Multi" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    await waitFor(() =>
      expect(comp.queryByTestId("size-loading")).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(comp.queryByTestId("size-loading")).not.toBeInTheDocument()
    );

    userEvent.type(comp.getByLabelText("Name *"), "test-name");
    userEvent.click(comp.getByRole("button", { name: "Create instance" }));

    await waitFor(() =>
      expect(onCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          billing: "prepaid",
          name: "test-name",
          provider: "aws",
          region: "eu-west-1",
          sizeId: "x1",
        }),
        expect.anything(),
        expect.anything()
      )
    );
  });

  it("should show a form for trial instances with an alert and AZ disabled", async () => {
    const comp = renderDialog(<TrialAvailableOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "You can create a trial instance to evaluate this service."
      )
    ).toBeInTheDocument();
    expect(comp.getByLabelText("Name *")).toBeEnabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeEnabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when out of quota and a disabled form", async () => {
    const comp = renderDialog(<OutOfQuotaOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.getByText("Your organization is out of quota.")
      ).toBeInTheDocument()
    );

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when trial instances are unavailable, and a disabled form", async () => {
    const comp = renderDialog(<TrialUnavailableOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "All available trial instances are currently in use. Please try again later."
        )
      ).toBeInTheDocument()
    );

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when a trial instance has been already created, and a disabled form", async () => {
    const comp = renderDialog(<TrialUsedOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "You can deploy 1 trial instance at a time. To deploy a new instance, delete your existing one first.",
        { exact: false }
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an alert when a generic error contacting the API happened when opening the modal, and a disabled form", async () => {
    const comp = renderDialog(<ErrorOnFormLoad />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    expect(
      comp.queryByText(
        "Kafka instances are temporarily available. Please try again in a few hours."
      )
    ).toBeInTheDocument();

    expect(comp.getByLabelText("Name *")).toBeDisabled();
    expect(comp.getByLabelText("Cloud provider *")).toBeDisabled();
    expect(
      within(comp.getByTestId("cloudRegion")).getByRole("button")
    ).toBeDisabled();
    expect(comp.getByRole("button", { name: "Single" })).toBeDisabled();
    expect(comp.getByRole("button", { name: "Multi" })).toBeDisabled();
  });

  it("should show an error when we can't fetch the sizes", async () => {
    const comp = renderDialog(<UnableToRetrieveSizes />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "Something went wrong while fetching the available sizes. Select another cloud provider or cloud region, or try again later."
        )
      ).toBeInTheDocument()
    );
  });

  it("should show an error when we can't fetch the sizes (ok response, empty array)", async () => {
    const comp = renderDialog(<GotEmptySizes />);
    await waitForI18n(comp);

    await waitFor(() =>
      expect(
        comp.queryByText("Checking if new Kafka instances are available")
      ).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        comp.getByText(
          "Something went wrong while fetching the available sizes. Select another cloud provider or cloud region, or try again later."
        )
      ).toBeInTheDocument()
    );
  });
});
