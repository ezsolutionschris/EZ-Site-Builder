git add src/lib/instant.ts


 { init } from "@instantdb/react";
 
const APP_ID = "44ec6d65-370b-442e-ab41-c7dafe23ad05";
 
// Schema for your app
export type Project = {
  id: string;
  name: string;
  stitchProjectId: string;
  lastHtml: string | null;
  lastImageUrl: string | null;
  createdAt: number;
  updatedAt: number;
};
 
export type Schema = {
  projects: Project;
};
 
export const db = init<Schema>({ appId: APP_ID });