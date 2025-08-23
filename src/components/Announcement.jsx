import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function Announcement() {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/90 px-4 py-6">
      <div className="relative mx-auto max-w-5xl">
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 z-10 rounded text-xl font-bold text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          aria-label="Close announcement"
        >
          ×
        </button>

        <Card className="border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
                  🎟️ Gary P. Nunn Live at Tolbert's!
                </h2>
                <p className="text-lg font-semibold text-foreground">
                  October 9, 2025
                </p>
                <p className="max-w-2xl text-muted-foreground">
                  Get ready for an unforgettable evening with legendary Texas
                  songwriter Gary P. Nunn! Join us for this exclusive live
                  performance at Tolbert's. Tickets will be available soon.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <a
                  href="https://outhousetickets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Buy Tickets
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
