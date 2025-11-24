"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Heart, History, Coins, TrendingUp, Plus, Search } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your digital shop, purchases, and inventory
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/shop">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Shop
            </Button>
          </Link>
          <Link href="/inventory">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SBD Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450 SBD</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              3 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Listed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              2 active sales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              5 on sale now
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Purchases */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Purchases</CardTitle>
                <CardDescription>Your latest digital item purchases</CardDescription>
              </div>
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Premium Theme Pack {i}</p>
                    <p className="text-sm text-muted-foreground">Purchased 2 days ago</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">250 SBD</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Listings</CardTitle>
                <CardDescription>Items you're selling</CardDescription>
              </div>
              <Link href="/inventory">
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="h-12 w-12 rounded bg-emerald-500/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Digital Asset {i}</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-emerald-600">Active</span> • 5 views
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">150 SBD</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/shop" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Search className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Browse Shop</div>
                  <div className="text-xs text-muted-foreground">Find new items</div>
                </div>
              </Button>
            </Link>
            <Link href="/cart" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <ShoppingCart className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Shopping Cart</div>
                  <div className="text-xs text-muted-foreground">3 items</div>
                </div>
              </Button>
            </Link>
            <Link href="/wishlist" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Heart className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Wishlist</div>
                  <div className="text-xs text-muted-foreground">12 items saved</div>
                </div>
              </Button>
            </Link>
            <Link href="/inventory" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Package className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">My Inventory</div>
                  <div className="text-xs text-muted-foreground">Manage listings</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Sales Analytics (for sellers) */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Your selling statistics this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">1,250 SBD</p>
                <p className="text-xs text-emerald-600">+15% from last month</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sales</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-blue-600">+3 this week</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Items</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">2 pending approval</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
