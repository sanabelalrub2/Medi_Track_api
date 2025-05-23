import ReportModel from "../../../DB/models/report.model.js";

export const createReport = async (req, res) => {
  const report = await ReportModel.create(req.body);
  res.json({ message: "Created", report });
};

export const getReportById = async (req, res) => {
  const { id } = req.params;
  const report = await ReportModel.findById(id);
  res.json({ message: "Done", report });
};

export const getAllReports = async (req, res) => {
  const { userId } = req.query;
  const reports = await ReportModel.find({ userId });
  res.json({ message: "Done", reports });
};
