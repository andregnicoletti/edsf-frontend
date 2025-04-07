export type CreateLeadData = {
  name: string;
  company: string;
  phone?: string;
  email?: string;
  referralSource?: string;
  message?: string;
};

export type CreateLeadResponse = {
  message: string;
};

export type GetLeadsResponse = {
  channels: Array<{
    id: string;
    channelName: string;
  }>;
};

export type LeadsArray = Array<LeadType>;

export type LeadType = {
  id: string;
  channelName: string;
};
