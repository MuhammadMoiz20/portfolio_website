"use client";

import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import XIcon from "@/components/common/XIcon";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <>
      <div className="pt-20">
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Get In Touch
              </h1>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid gap-10 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>

                <div className="mb-8 space-y-4">
                  <ContactInfo
                    icon={<FiMail />}
                    title="Email"
                    content="moizcs059@gmail.com"
                    link="mailto:moizcs059@gmail.com"
                  />

                  <ContactInfo
                    icon={<FiPhone />}
                    title="Phone"
                    content="(603) 349-0579"
                    link="tel:+16033490579"
                  />

                  <ContactInfo
                    icon={<FiMapPin />}
                    title="Location"
                    content="Hanover, New Hampshire"
                  />
                </div>

                <h3 className="mb-4 text-lg font-semibold">Connect with me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/in/moizofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0077B5] text-white transition-transform hover:scale-110"
                  >
                    <FiLinkedin size={20} />
                  </a>

                  <a
                    href="https://github.com/MuhammadMoiz20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#333] text-white transition-transform hover:scale-110"
                  >
                    <FiGithub size={20} />
                  </a>

                  <a
                    href="https://x.com/zahid_moiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X Profile"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110"
                  >
                    <XIcon size={20} />
                  </a>
                </div>

                <div className="mt-10 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                  <h3 className="mb-3 text-lg font-semibold">Office Hours</h3>
                  <p className="mb-2 text-gray-600 dark:text-gray-400">
                    Monday - Friday: 9am - 5pm EST
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Weekend: Available for urgent matters
                  </p>
                </div>
              </motion.div>

              <div>
                <h2 className="mb-6 text-2xl font-bold">Send a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold">Find Me</h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                Located in the heart of Dartmouth College campus
              </p>
            </motion.div>

            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.71873125362!2d-72.29162222393012!3d43.70529837119769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb4c9de5c8b18cf%3A0x86a4414c5ec58611!2sDartmouth%20College!5e0!3m2!1sen!2sus!4v1711517235056!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dartmouth College Map"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
