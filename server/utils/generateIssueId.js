import counterModel from "../models/counterIdModel.js";

export const generateIssueId = async () => {
  const counter = await counterModel.findOneAndUpdate(
    { name: "issue" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  return `#ISS-${String(counter.seq).padStart(3, "0")}`;
};
