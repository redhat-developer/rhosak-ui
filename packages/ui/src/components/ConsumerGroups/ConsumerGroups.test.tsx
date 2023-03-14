import { fireEvent, userEvent, within } from "@storybook/testing-library";
import { composeStories } from "@storybook/testing-react";
import { render, waitForI18n } from "../../test-utils";
import * as stories from "./ConsumerGroups.stories";

const { DefaultConsumerGroupTable } = composeStories(stories);

describe("Consumer group table", () => {
  it("Consumer group table should have kebab menu", async () => {
    const comp = render(<DefaultConsumerGroupTable />);
    await waitForI18n(comp);

    const firstRow = comp.getAllByRole("row")[1];

    const btnExpand = within(firstRow).getByRole("button");
    userEvent.click(btnExpand);

    expect(await comp.findByText("Delete")).toBeInTheDocument();
    expect(await comp.findByText("View partition offsets")).toBeInTheDocument();
    expect(await comp.findByText("Reset offset")).toBeInTheDocument();
  });

  it("on click action on the kebab menu", async () => {
    const onDelete = jest.fn();
    const onClickPartitionoffset = jest.fn();
    const onClickResetoffset = jest.fn();

    const comp = render(
      <DefaultConsumerGroupTable
        onDelete={onDelete}
        onViewPartition={onClickPartitionoffset}
        onViewResetOffset={onClickResetoffset}
      />
    );
    await waitForI18n(comp);

    const firstRow = comp.getAllByRole("row")[1];

    const btnExpand = within(firstRow).getByRole("button");
    fireEvent.click(btnExpand);
    userEvent.click(await comp.findByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(1);
    fireEvent.click(btnExpand);
    userEvent.click(await comp.findByText("View partition offsets"));
    expect(onClickPartitionoffset).toHaveBeenCalledTimes(1);
    fireEvent.click(btnExpand);
    userEvent.click(await comp.findByText("Reset offset"));
    expect(onClickResetoffset).toHaveBeenCalledTimes(1);

    expect(onDelete).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "consumer-123",
        activeConsumers: 1,
        laggingPartitions: 2,
        state: "CompletingRebalance",
      })
    );
    expect(onClickResetoffset).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "consumer-123",
        activeConsumers: 1,
        laggingPartitions: 2,
        state: "CompletingRebalance",
      })
    );
    expect(onClickPartitionoffset).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "consumer-123",
        activeConsumers: 1,
        laggingPartitions: 2,
        state: "CompletingRebalance",
      })
    );

    const secondRow = comp.getAllByRole("row")[2];
    const btn2Expand = within(secondRow).getByRole("button");
    fireEvent.click(btn2Expand);
    userEvent.click(await comp.findByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(2);
    fireEvent.click(btn2Expand);
    userEvent.click(await comp.findByText("View partition offsets"));
    expect(onClickPartitionoffset).toHaveBeenCalledTimes(2);
    fireEvent.click(btn2Expand);
    userEvent.click(await comp.findByText("Reset offset"));
    expect(onClickResetoffset).toHaveBeenCalledTimes(2);
    expect(onDelete).toHaveBeenLastCalledWith(
      expect.objectContaining({
        name: "consumer-233",
        activeConsumers: 2,
        laggingPartitions: 3,
        state: "Stable",
      })
    );
    expect(onClickResetoffset).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "consumer-233",
        activeConsumers: 2,
        laggingPartitions: 3,
        state: "Stable",
      })
    );
    expect(onClickPartitionoffset).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "consumer-233",
        activeConsumers: 2,
        laggingPartitions: 3,
        state: "Stable",
      })
    );
  });
});
