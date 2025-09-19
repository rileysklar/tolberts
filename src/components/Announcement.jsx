import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function Announcement() {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/90 px-4 py-6">
      <div className="relative mx-auto max-w-5xl">
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
                  performance at Tolbert's. Tickets are available now!
                </p>
              </div>

              <Button
                disabled={true}
                size="lg"
                className="cursor-not-allowed bg-gray-400 opacity-50 hover:bg-gray-400"
              >
                <span className="inline-flex items-center gap-2">Sold Out</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
