"use client";

import React from "react";
import contentData from "@/data/content.json";
import { FilterResponseChart } from "@/components/charts/FilterResponseChart";
import { ChartPlaceholder } from "@/components/charts/ChartPlaceholder";
import { MathEquation } from "@/components/math/MathEquation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { TableOfContents } from "@/components/navigation/TableOfContents";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";

export default function DesignPage() {
  const designSection = contentData.sections.find(s => s.id === "design");

  if (!designSection) {
    return <div>Section not found</div>;
  }

  // Simulated filter response data for demonstration
  const lpfData = Array.from({ length: 50 }, (_, i) => {
    const f = i * 20;
    const fc = 300;
    const mag = -10 * Math.log10(1 + Math.pow(f/fc, 2));
    const phase = -Math.atan(f/fc) * (180/Math.PI);
    return { freq: f, mag, phase };
  });

  return (
    <div className="flex gap-12 pb-20">
      <div className="flex-1 space-y-12">
        <Breadcrumbs />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight font-primary">{designSection.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Noise identification and specific filter design parameters.
        </p>
      </div>

        <div className="space-y-16">
          {designSection.subsections.map((sub) => (
            <section key={sub.id} id={sub.id} className="space-y-8 scroll-mt-24">
              <h2 className="text-3xl font-bold font-primary border-b pb-2">{sub.title}</h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sub.content.split('\n\n').map((p, i) => (
                p.trim() && <p key={i} className="leading-relaxed">{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
              {sub.subsections.map((child) => (
                <Card key={child.id} id={child.id} className="overflow-hidden scroll-mt-24">
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="text-xl font-primary">{child.title}</CardTitle>
                    <CardDescription>
                      Design considerations and performance characteristics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                        {child.content.split('\n\n').map((p, i) => (
                            p.trim() && <p key={i}>{p}</p>
                        ))}
                    </div>

                    {/* Logic for specific designs */}
                    {child.id.includes("low-pass") && (
                        <div className="space-y-6">
                            <MathEquation
                                displayMode
                                label="Butterworth LPF"
                                latex="H(s) = \frac{\omega_c}{s + \omega_c}"
                            />
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Frequency Response</h4>
                                <Tabs defaultValue="magnitude" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="magnitude">Magnitude (dB)</TabsTrigger>
                                        <TabsTrigger value="phase">Phase (Degrees)</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="magnitude">
                                        <FilterResponseChart data={lpfData} type="magnitude" />
                                    </TabsContent>
                                    <TabsContent value="phase">
                                        <FilterResponseChart data={lpfData} type="phase" />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}

                    {child.id.includes("notch") || child.id.includes("high-pass") ? (
                        <ChartPlaceholder
                            title={`${child.title.split(":")[1] || child.title} Response`}
                            description="Full spectral response visualization using MATLAB design parameters."
                        />
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
            </section>
          ))}
        </div>
      </div>
      <TableOfContents />
    </div>
  );
}
