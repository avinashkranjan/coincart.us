export type TemplateVariable = {
  key: string;
  label: string;
  description?: string;
  type: "text" | "number" | "date" | "boolean" | "image";
  defaultValue?: string | number | boolean;
};

export type TemplateData = Record<string, any>;

export function extractVariables(template: string): string[] {
  const regex = /\{\{([^}]+)\}\}/g;
  const matches = template.match(regex) || [];
  return matches.map((match) => match.replace(/\{\{|\}\}/g, "").trim());
}

export function renderTemplate(template: string, data: TemplateData): string {
  let rendered = template;

  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
    rendered = rendered.replace(regex, String(value));
  });

  rendered = rendered.replace(/\{\{[^}]+\}\}/g, "");

  return rendered;
}

export const commonVariables: TemplateVariable[] = [
  {
    key: "firstName",
    label: "First Name",
    description: "Recipient's first name",
    type: "text",
    defaultValue: "John",
  },
  {
    key: "lastName",
    label: "Last Name",
    description: "Recipient's last name",
    type: "text",
    defaultValue: "Doe",
  },
  {
    key: "email",
    label: "Email Address",
    description: "Recipient's email address",
    type: "text",
    defaultValue: "john.doe@example.com",
  },
  {
    key: "companyName",
    label: "Company Name",
    description: "Name of the company",
    type: "text",
    defaultValue: "Acme Inc",
  },
  {
    key: "currentDate",
    label: "Current Date",
    description: "Today's date",
    type: "date",
    defaultValue: new Date().toLocaleDateString(),
  },
  {
    key: "unsubscribeLink",
    label: "Unsubscribe Link",
    description: "Link to unsubscribe from emails",
    type: "text",
    defaultValue: "https://example.com/unsubscribe",
  },
];

export function generateReferenceCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 7; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatDate(date: any) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getFutureDate(daysFromNow: any) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return formatDate(date);
}
