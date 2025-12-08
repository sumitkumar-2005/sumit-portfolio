import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { contactFormSchema } from "@shared/schema";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);

      const submission = await storage.saveContactSubmission(validatedData);

      console.log("CONTACT FORM SUBMISSION:", {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        message: submission.message,
        timestamp: submission.submittedAt.toISOString(),
      });

      return res.status(200).json({ 
        ok: true, 
        message: "Message received successfully",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ 
          error: "Validation failed", 
          details: error.errors 
        });
      }
      
      console.error("Contact form error:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  return httpServer;
}
