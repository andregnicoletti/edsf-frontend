import { changeUserTerms, makeLogin, sendCode, verifyToken } from "./auth/auth";
import { requestCities } from "./cities/cities";
import {
  deleteNewPanel,
  getInticator,
  saveNewPanel,
  sendPanelPreview,
  sendRequestYearsData,
  updateNewPanel,
} from "./configNewPanel/configNewPanel";
import { requestCourses } from "./courses/courses";
import {
  requestDashboardLinesChart,
  requestDashboardStackedBars,
  requestDetailedExtract,
  requestPanelById,
  requestPanelsList,
  requestSummaryExtract,
} from "./dashboard/dashboard";
import { getUploadedCsv, onClickDownloadTemplate } from "./download/download";
import { getHelpInfo } from "./help/help";
import { requestIndicators } from "./indicators/indicators";
import { createLead, getLeads } from "./leads/leads";
import { requestProducersByCitiesIds } from "./producers/producers";
import { getTermsAndPrivacy } from "./termsAndPrivacy/termsAndPrivacy";
import { createUpload, getUploadCodes, getUploadDetail } from "./upload/upload";

const apiService = {
  sendCode,
  makeLogin,
  requestDetailedExtract,
  onClickDownloadTemplate,
  getUploadedCsv,
  createLead,
  getLeads,
  createUpload,
  getUploadDetail,
  getUploadCodes,
  requestCities,
  requestCourses,
  getTermsAndPrivacy,
  getHelpInfo,
  getInticator,
  sendPanelPreview,
  saveNewPanel,
  deleteNewPanel,
  updateNewPanel,
  requestPanelsList,
  requestPanelById,
  requestDashboardStackedBars,
  requestDashboardLinesChart,
  requestIndicators,
  requestProducersByCitiesIds,
  requestSummaryExtract,
  verifyToken,
  changeUserTerms,
  sendRequestYearsData,
};

export default apiService;
