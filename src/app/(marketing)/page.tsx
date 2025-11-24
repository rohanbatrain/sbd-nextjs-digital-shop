"use client";

import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, Package, TrendingUp, ArrowRight, Github, Users, DollarSign, Star, Zap } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function LandingPage() {
    return (
        <>
            <Header
                appName="Digital Shop"
                appIcon={<ShoppingCart className="w-8 h-8 text-emerald-400" />}
                primaryColor="emerald"
            />
            <div className="relative min-h-screen w-full h-full flex flex-col items-center overflow-hidden bg-[#040508] pt-16">
                <div className="w-full">
                    {/* Hero Section */}
                    <section className="relative pt-32 pb-16 container mx-auto px-4 z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-6 flex flex-col gap-8 items-center justify-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block"
                            >
                                <span className="relative px-4 py-2 rounded-xl flex flex-row gap-2 items-center bg-white/10 text-sm text-white/90 backdrop-blur-sm border border-white/10 overflow-hidden">
                                    <motion.div
                                        className="absolute top-0 w-[10px] h-full bg-emerald-300 opacity-60 blur-md shadow-2xl"
                                        initial={{ left: "-10%" }}
                                        animate={{ left: "110%" }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: "linear",
                                        }}
                                    />
                                    <ShoppingCart className="w-4 h-4 relative z-10" />
                                    <p className="relative z-10">
                                        DIGITAL MARKETPLACE PLATFORM
                                    </p>
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-6xl md:text-7xl lg:text-8xl text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold tracking-tight"
                            >
                                Your Digital <br className="hidden md:block" /> Marketplace
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="max-w-3xl mx-auto text-lg text-white/80 leading-relaxed"
                            >
                                A comprehensive digital shop platform with virtual currency, item management, and seamless transactions.
                                Built for modern digital commerce.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full"
                            >
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                    <Package className="w-8 h-8 text-emerald-400 shrink-0" />
                                    <div className="text-left">
                                        <p className="text-white font-medium">Item Management</p>
                                        <p className="text-white/60 text-sm">Create and manage digital products</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                    <CreditCard className="w-8 h-8 text-blue-400 shrink-0" />
                                    <div className="text-left">
                                        <p className="text-white font-medium">Virtual Currency</p>
                                        <p className="text-white/60 text-sm">SBD token transactions</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                                    <TrendingUp className="w-8 h-8 text-purple-400 shrink-0" />
                                    <div className="text-left">
                                        <p className="text-white font-medium">Analytics</p>
                                        <p className="text-white/60 text-sm">Track sales and performance</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0 }}
                                className="space-y-4 flex flex-col items-center justify-center pt-4"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/auth/signup">
                                        <button className="bg-gradient-to-b from-emerald-600 to-emerald-800 px-8 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto hover:from-emerald-700 hover:to-emerald-900 transition-all duration-300 border border-emerald-500/50">
                                            Get Started
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                    <Link href="/dashboard">
                                        <button className="bg-gradient-to-b from-gray-700 to-gray-900 px-8 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2 w-full sm:w-auto hover:from-gray-600 hover:to-gray-800 transition-all duration-300 border border-gray-600/50">
                                            <ShoppingCart className="w-5 h-5" />
                                            Browse Shop
                                        </button>
                                    </Link>
                                </div>
                                <p className="text-sm text-white/40">
                                    Don&apos;t have an account?{' '}
                                    <Link href="/auth/signup" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                                        Sign up free
                                    </Link>
                                </p>
                                <p className="text-sm text-white/40 font-mono">
                                    Secure • Fast • Scalable
                                </p>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* Stats Section */}
                    <Stats
                        stats={[
                            {
                                icon: <Users className="w-8 h-8 text-emerald-400" />,
                                value: "5K+",
                                label: "Active Sellers",
                                color: "bg-emerald-500/20"
                            },
                            {
                                icon: <Package className="w-8 h-8 text-blue-400" />,
                                value: "50K+",
                                label: "Items Listed",
                                color: "bg-blue-500/20"
                            },
                            {
                                icon: <DollarSign className="w-8 h-8 text-purple-400" />,
                                value: "1M+",
                                label: "SBD Transacted",
                                color: "bg-purple-500/20"
                            },
                            {
                                icon: <Star className="w-8 h-8 text-amber-400" />,
                                value: "4.9/5",
                                label: "Seller Rating",
                                color: "bg-amber-500/20"
                            }
                        ]}
                    />

                    {/* Features Section */}
                    <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#040508] to-[#0C0F15] justify-center items-center relative py-20">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-16">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-5xl md:text-6xl font-light mb-6 text-white"
                                >
                                    Core Features
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl text-white/70 max-w-3xl mx-auto"
                                >
                                    Everything you need to run a digital marketplace
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                            >
                                <FeatureCard
                                    icon={<Package className="w-6 h-6 text-emerald-400" />}
                                    iconBg="bg-emerald-500/20"
                                    title="Product Management"
                                    description="Create, edit, and manage digital items with ease. Support for images, descriptions, pricing, and inventory tracking."
                                    list={[
                                        "Unlimited product listings",
                                        "Image upload and management",
                                        "Dynamic pricing controls",
                                        "Stock and availability tracking"
                                    ]}
                                />
                                <FeatureCard
                                    icon={<CreditCard className="w-6 h-6 text-blue-400" />}
                                    iconBg="bg-blue-500/20"
                                    title="Virtual Currency"
                                    description="Built-in SBD token system for seamless transactions. Secure wallet management and transaction history."
                                    list={[
                                        "SBD token integration",
                                        "Wallet management",
                                        "Transaction history",
                                        "Balance tracking"
                                    ]}
                                    delay={0.1}
                                />
                                <FeatureCard
                                    icon={<ShoppingCart className="w-6 h-6 text-purple-400" />}
                                    iconBg="bg-purple-500/20"
                                    title="Shopping Experience"
                                    description="Intuitive browsing, filtering, and purchasing flow. Quick checkout and order management."
                                    list={[
                                        "Advanced search and filters",
                                        "Shopping cart system",
                                        "Quick checkout process",
                                        "Order history"
                                    ]}
                                    delay={0.2}
                                />
                                <FeatureCard
                                    icon={<TrendingUp className="w-6 h-6 text-pink-400" />}
                                    iconBg="bg-pink-500/20"
                                    title="Analytics & Insights"
                                    description="Track sales, monitor popular items, and gain insights into your marketplace performance."
                                    list={[
                                        "Sales analytics",
                                        "Popular items tracking",
                                        "Revenue reports",
                                        "User engagement metrics"
                                    ]}
                                    delay={0.3}
                                />
                            </motion.div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <HowItWorks
                        title="How Digital Shop Works"
                        subtitle="Start selling in minutes with our streamlined process"
                        steps={[
                            {
                                number: "01",
                                title: "List Items",
                                description: "Create product listings with images, descriptions, and pricing in SBD tokens.",
                                icon: <Package className="w-8 h-8 text-emerald-400" />
                            },
                            {
                                number: "02",
                                title: "Set Prices",
                                description: "Price your items in SBD tokens with flexible pricing and inventory management.",
                                icon: <DollarSign className="w-8 h-8 text-blue-400" />
                            },
                            {
                                number: "03",
                                title: "Receive Orders",
                                description: "Get instant notifications when customers purchase your digital products.",
                                icon: <ShoppingCart className="w-8 h-8 text-purple-400" />
                            },
                            {
                                number: "04",
                                title: "Track Sales",
                                description: "Monitor your revenue, popular items, and customer engagement with analytics.",
                                icon: <TrendingUp className="w-8 h-8 text-amber-400" />
                            }
                        ]}
                    />

                    {/* Testimonials Section */}
                    <Testimonials
                        testimonials={[
                            {
                                quote: "Digital Shop made it incredibly easy to monetize my digital assets. The SBD token system is seamless, and I've already made over 10,000 SBD in my first month!",
                                author: "Alex Thompson",
                                role: "Digital Artist & Creator",
                                avatar: <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center"><Users className="w-6 h-6 text-emerald-400" /></div>
                            },
                            {
                                quote: "The analytics dashboard helps me understand what my customers want. I've optimized my inventory based on the insights and doubled my sales in just two weeks.",
                                author: "Maria Garcia",
                                role: "E-commerce Entrepreneur",
                                avatar: <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center"><TrendingUp className="w-6 h-6 text-blue-400" /></div>
                            }
                        ]}
                    />

                    {/* FAQ Section */}
                    <FAQ
                        faqs={[
                            {
                                question: "What are SBD tokens and how do they work?",
                                answer: "SBD (Second Brain Database) tokens are our virtual currency used for all transactions. Users can earn tokens through various activities or purchase them. Sellers receive SBD tokens when their items are purchased, which can be used within the ecosystem or withdrawn."
                            },
                            {
                                question: "Is there a fee for listing items?",
                                answer: "No! Listing items on Digital Shop is completely free. We only take a small commission (5%) when an item is sold, ensuring you only pay when you make money."
                            },
                            {
                                question: "What types of digital products can I sell?",
                                answer: "You can sell any digital product including ebooks, courses, templates, graphics, music, software, and more. As long as it's digital and you have the rights to sell it, you can list it on our platform."
                            },
                            {
                                question: "How do I get paid?",
                                answer: "When a customer purchases your item, the SBD tokens are instantly credited to your wallet. You can use these tokens to purchase other items, transfer them to family members, or withdraw them according to our withdrawal policy."
                            },
                            {
                                question: "Can I offer discounts or promotions?",
                                answer: "Yes! Our platform supports flexible pricing, discounts, and promotional campaigns. You can create limited-time offers, bundle deals, and special pricing for loyal customers."
                            },
                            {
                                question: "Is my shop data secure?",
                                answer: "Absolutely. We use enterprise-grade encryption and security measures to protect your data. All transactions are logged and auditable, and we comply with industry-standard security practices."
                            }
                        ]}
                    />

                    {/* CTA Section */}
                    <section className="min-h-screen w-full flex flex-col bg-gradient-to-b from-[#0C0F15] to-[#040508] justify-center items-center relative py-20">
                        <div className="container mx-auto px-4 text-center">
                            <h2 className="text-6xl md:text-7xl font-light mb-6 text-white">
                                Ready to Launch Your Shop?
                            </h2>
                            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
                                Join the digital marketplace revolution. Start selling and managing your digital products today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link href="/auth/signup">
                                    <button className="bg-gradient-to-b from-emerald-600 to-emerald-800 px-8 py-4 rounded-lg text-white font-medium text-lg flex items-center gap-2 hover:from-emerald-700 hover:to-emerald-900 transition-all duration-300 border border-emerald-500/50">
                                        <ShoppingCart className="w-5 h-5" />
                                        Start Selling
                                    </button>
                                </Link>
                                <Link href="https://github.com/rohanbatrain/second_brain_database" target="_blank" rel="noopener noreferrer">
                                    <button className="bg-gradient-to-b from-gray-700 to-gray-900 px-8 py-4 rounded-lg text-white font-medium text-lg flex items-center gap-2 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 border border-gray-600/50">
                                        <Github className="w-5 h-5" />
                                        View on GitHub
                                    </button>
                                </Link>
                            </div>

                            <div className="mt-12 text-center">
                                <p className="text-white/60 mb-4">Trusted by digital sellers worldwide</p>
                                <div className="flex justify-center gap-8 text-white/40 text-sm">
                                    <span>Secure Payments</span>
                                    <span>•</span>
                                    <span>Fast Transactions</span>
                                    <span>•</span>
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer
                    appName="Digital Shop"
                    appDescription="Your comprehensive digital marketplace platform with virtual currency, item management, and seamless transactions."
                    features={[
                        { name: "Product Management", href: "#" },
                        { name: "Virtual Currency", href: "#" },
                        { name: "Shopping Experience", href: "#" },
                        { name: "Analytics & Insights", href: "#" }
                    ]}
                />
            </div >
        </>
    );
}

function FeatureCard({ icon, iconBg, title, description, list, delay = 0 }: {
    icon: React.ReactNode,
    iconBg: string,
    title: string,
    description: string,
    list: string[],
    delay?: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
            </div>
            <p className="text-white/80 mb-4">
                {description}
            </p>
            <ul className="text-white/70 space-y-2">
                {list.map((item, i) => (
                    <li key={i}>• {item}</li>
                ))}
            </ul>
        </motion.div>
    );
}
