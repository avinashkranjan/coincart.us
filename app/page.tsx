"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bitcoin,
  DollarSign,
  Globe2,
  Shield,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
} from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: "$45,243.32", change: "+2.34%" },
    { name: "Ethereum", symbol: "ETH", price: "$3,124.91", change: "+1.56%" },
    { name: "Cardano", symbol: "ADA", price: "$1.24", change: "+3.12%" },
    { name: "Solana", symbol: "SOL", price: "$98.45", change: "+4.67%" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Jump start your crypto portfolio
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-xl text-gray-500"
              >
                Coincart is the easiest place to buy and sell cryptocurrency.
                Sign up and get started today.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex items-center space-x-4"
              >
                <Button size="lg" className="text-lg px-8">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
                alt="Crypto Trading"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Crypto Prices Table */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cryptoData.map((crypto, index) => (
                  <motion.tr
                    key={crypto.symbol}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {crypto.name}
                        </div>
                        <div className="ml-2 text-sm text-gray-500">
                          {crypto.symbol}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {crypto.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {crypto.change}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button variant="outline" size="sm">
                        Trade
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The most trusted cryptocurrency platform
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Here are a few reasons why you should choose Coincart
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Shield className="h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Secure storage
              </h3>
              <p className="mt-2 text-center text-gray-500">
                We store the vast majority of the digital assets in secure
                offline storage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <DollarSign className="h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Protected by insurance
              </h3>
              <p className="mt-2 text-center text-gray-500">
                Cryptocurrency stored on our servers is covered by our insurance
                policy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <Globe2 className="h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Industry best practices
              </h3>
              <p className="mt-2 text-center text-gray-500">
                Coincart supports a variety of the most popular digital
                currencies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 border rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Create an account</h3>
              <p className="mt-2 text-gray-500">
                Get started with your email address
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center p-6 border rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Link your bank</h3>
              <p className="mt-2 text-gray-500">
                Connect your bank account to deposit funds
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center p-6 border rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">Start trading</h3>
              <p className="mt-2 text-gray-500">
                Buy and sell cryptocurrency with ease
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mobile App Section */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Trade on the go
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Download the Coincart app to trade cryptocurrency anywhere,
                anytime.
              </p>
              <div className="mt-8 flex space-x-4">
                <Image
                  src="https://images.unsplash.com/photo-1609336128863-77a7d937a0c7?auto=format&fit=crop&q=80"
                  alt="App Store"
                  width={140}
                  height={42}
                  className="rounded-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1609336128863-77a7d937a0c7?auto=format&fit=crop&q=80"
                  alt="Play Store"
                  width={140}
                  height={42}
                  className="rounded-lg"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
                alt="Mobile App"
                width={400}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
