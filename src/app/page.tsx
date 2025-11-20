import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Zap, Gift } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>New items added weekly</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600">
            Your Digital Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, purchase, and manage digital assets with ease.
            From themes to tools, find everything you need in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                Browse Shop <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose DigitalShop?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The best platform for buying and managing your digital assets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Instant Delivery</CardTitle>
                <CardDescription>
                  Get your digital items immediately after purchase.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>
                  Your transactions are protected with enterprise-grade security.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Gift className="h-6 w-6" />
                </div>
                <CardTitle>Exclusive Items</CardTitle>
                <CardDescription>
                  Access unique digital assets you won't find anywhere else.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle>Regular Updates</CardTitle>
                <CardDescription>
                  New items and categories added every week.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-muted-foreground">
              Explore our most popular digital asset categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Themes', 'Icons', 'Templates', 'Plugins'].map((category) => (
              <Link key={category} href={`/shop?category=${category.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Start Shopping?</h2>
          <p className="text-xl text-muted-foreground">
            Browse thousands of digital assets and find exactly what you need.
          </p>
          <Link href="/shop">
            <Button size="lg" className="gap-2">
              Explore Shop <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
