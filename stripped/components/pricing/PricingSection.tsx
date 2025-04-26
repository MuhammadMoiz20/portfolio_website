'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiHelpCircle } from 'react-icons/fi';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

interface PricingFeature {
    name: string;
  
    included: boolean;
  
    tooltip?: string;
}

export interface PricingPlan {
    id: string | number;
  
    name: string;
  
    description: string;
  
    price: number | string;
  
    currency?: string;
  
    billingPeriod?: string;
  
    buttonText?: string;
  
    buttonUrl?: string;
  
    features: PricingFeature[];
  
    isPopular?: boolean;
  
    badge?: string;
  
    isRecommended?: boolean;
  
    discount?: string;
  
    originalPrice?: number | string;
}

interface PricingSectionProps {
    title?: string;
  
    subtitle?: string;
  
    plans: PricingPlan[];
  
    enableBillingToggle?: boolean;
  
    annualDiscount?: number;
  
    showComparisonTable?: boolean;
  
    showMoneyBackGuarantee?: boolean;
  
    className?: string;
}

export default function PricingSection({
  title = 'Pricing Plans',
  subtitle,
  plans,
  enableBillingToggle = false,
  annualDiscount = 20,
  showComparisonTable = false,
  showMoneyBackGuarantee = true,
  className = '',
}: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  
  /**
   * Calculate price based on billing period
   */
  const calculatePrice = (plan: PricingPlan) => {
    if (typeof plan.price === 'string') {
      return plan.price; 
    }
    
    if (isAnnual) {
      const monthlyPrice = plan.price;
      const annualPrice = (monthlyPrice * 12) * (1 - annualDiscount / 100);
      return Math.round(annualPrice / 12);
    }
    
    return plan.price;
  };
  
    const calculateOriginalPrice = (plan: PricingPlan) => {
    if (!plan.originalPrice) return null;
    
    if (typeof plan.originalPrice === 'string') {
      return plan.originalPrice;
    }
    
    if (isAnnual) {
      return Math.round((plan.originalPrice * 12) * (1 - annualDiscount / 100) / 12);
    }
    
    return plan.originalPrice;
  };
  
    const showTooltip = (featureId: string) => {
    setTooltipVisible(featureId);
  };
  
    const hideTooltip = () => {
    setTooltipVisible(null);
  };
  
    const toggleBilling = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {}
        <SectionHeading
          title={title}
          subtitle={subtitle}
          centered
          className="mb-12"
        />
        
        {}
        {enableBillingToggle && (
          <div className="mb-10 flex justify-center">
            <div className="flex items-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
              <button
                onClick={() => setIsAnnual(false)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  !isAnnual
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              
              <button
                onClick={() => setIsAnnual(true)}
                className={`ml-0.5 flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  isAnnual
                    ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                Annual
                <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  Save {annualDiscount}%
                </span>
              </button>
            </div>
          </div>
        )}
        
        {}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative flex flex-col overflow-hidden rounded-xl border ${
                  plan.isPopular
                    ? 'border-primary-200 dark:border-primary-700'
                    : 'border-gray-200 dark:border-gray-700'
                } ${
                  plan.isPopular
                    ? 'bg-primary-50 dark:bg-primary-900/10'
                    : 'bg-white dark:bg-gray-800'
                } ${
                  plan.isRecommended ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
                }`}
              >
                {}
                {plan.isPopular && (
                  <div className="absolute right-0 top-0">
                    <div className="h-16 w-16 overflow-hidden">
                      <div className="absolute left-0 top-0 h-2 w-2 bg-primary-600 dark:bg-primary-500"></div>
                      <div className="absolute bottom-0 right-0 h-2 w-2 bg-primary-600 dark:bg-primary-500"></div>
                      <div
                        className="absolute bottom-0 right-0 -mb-3 -mr-3 rotate-45 transform bg-primary-600 py-1 px-7 text-center text-xs font-bold text-white dark:bg-primary-500"
                      >
                        {plan.badge || 'Popular'}
                      </div>
                    </div>
                  </div>
                )}
                
                {}
                {plan.isRecommended && (
                  <div className="absolute left-0 top-0 w-full rounded-t-xl bg-primary-500 py-1 text-center text-sm font-medium text-white dark:bg-primary-600">
                    Recommended
                  </div>
                )}
                
                {}
                <div className={`p-6 ${plan.isRecommended ? 'pt-10' : ''}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </p>
                  
                  {}
                  <div className="mt-6">
                    {}
                    {plan.discount && (
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {plan.discount}
                      </span>
                    )}
                    
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {plan.currency || '$'}
                      </span>
                      
                      <span className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {calculatePrice(plan)}
                      </span>
                      
                      <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                        {plan.billingPeriod || (isAnnual ? '/mo' : '/mo')}
                      </span>
                    </div>
                    
                    {}
                    {plan.originalPrice && (
                      <div className="mt-1 text-base text-gray-500 line-through dark:text-gray-400">
                        {plan.currency || '$'}{calculateOriginalPrice(plan)}{plan.billingPeriod || (isAnnual ? '/mo' : '/mo')}
                      </div>
                    )}
                    
                    {}
                    {isAnnual && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Billed annually (save {annualDiscount}%)
                      </p>
                    )}
                  </div>
                </div>
                
                {}
                <div className="flex flex-1 flex-col justify-between p-6 pt-0">
                  <div>
                    <ul className="mt-4 space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <FiCheck className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                          ) : (
                            <FiX className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-600" />
                          )}
                          
                          <span className="ml-3 text-gray-700 dark:text-gray-300">
                            {feature.name}
                            
                            {}
                            {feature.tooltip && (
                              <span className="relative ml-1 inline-block">
                                <button
                                  onMouseEnter={() => showTooltip(`${plan.id}-${i}`)}
                                  onMouseLeave={hideTooltip}
                                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                                >
                                  <FiHelpCircle size={14} />
                                </button>
                                
                                {tooltipVisible === `${plan.id}-${i}` && (
                                  <div className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-md bg-gray-900 p-2 text-xs text-white shadow-lg">
                                    {feature.tooltip}
                                    <div className="absolute left-1/2 top-full -ml-1 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-gray-900"></div>
                                  </div>
                                )}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {}
                  <div className="mt-8">
                    <Button
                      href={plan.buttonUrl || '#'}
                      variant={plan.isPopular ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full justify-center"
                    >
                      {plan.buttonText || 'Get Started'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {}
        {showComparisonTable && plans.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              Compare Plans
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Feature
                    </th>
                    
                    {plans.map((plan) => (
                      <th 
                        key={plan.id} 
                        scope="col" 
                        className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
                          plan.isPopular
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {}
                  {Array.from(new Set(plans.flatMap(plan => 
                    plan.features.map(f => f.name)
                  ))).map((featureName, featureIndex) => (
                    <tr 
                      key={featureIndex} 
                      className={featureIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {featureName}
                      </td>
                      
                      {plans.map((plan) => {
                        const feature = plan.features.find(f => f.name === featureName);
                        return (
                          <td 
                            key={`${plan.id}-${featureIndex}`} 
                            className={`whitespace-nowrap px-6 py-4 text-center text-sm ${
                              plan.isPopular ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                            }`}
                          >
                            {feature?.included ? (
                              <FiCheck className="mx-auto h-5 w-5 text-green-500 dark:text-green-400" />
                            ) : (
                              <FiX className="mx-auto h-5 w-5 text-gray-400 dark:text-gray-600" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {}
        {showMoneyBackGuarantee && (
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                30-day money-back guarantee.
              </span>{' '}
              Try risk-free – full refund if you're not satisfied.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
