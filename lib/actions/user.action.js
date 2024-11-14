"use server";

import { client } from "../db";
import { currentUser } from "@clerk/nextjs/server";

export async function createUser(form) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null };

    const saleType = form[0];
    const planStatus = form[1];
    const { storeName, storePhone, storeEmail, storeDescription } = form[2];
    let chapaSubAccountId;
    if (typeof planStatus === 'object') {
      chapaSubAccountId = form[3];
    }

    const userData = {
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      imageUrl: clerkUser.imageUrl,
      chapaSubAccountId: chapaSubAccountId,
      saleType: saleType,
      isActive: true,
      stores: {
        create: {
          name: storeName,
          description: storeDescription,
          email: storeEmail,
          phone: storePhone,
          domain: storeName.toLowerCase().replace(/\s+/g, ''),
        }
      }
    };

    if (typeof planStatus === 'object') {
      const startDate = new Date();
      let trialEndDate, endDate;

      if (planStatus.frequency === 'Monthly') {
        trialEndDate = new Date(startDate);
        trialEndDate.setDate(trialEndDate.getDate() + parseInt(process.env.TRIAL_DAYS)); // 3 day trial
        endDate = new Date(trialEndDate);
        endDate.setMonth(endDate.getMonth() + 1); // 1 month total
      } else if (planStatus.frequency === 'Yearly') {
        trialEndDate = new Date(startDate);
        trialEndDate.setDate(trialEndDate.getDate() + parseInt(process.env.TRIAL_DAYS)); // 3 day trial
        endDate = new Date(trialEndDate);
        endDate.setFullYear(endDate.getFullYear() + 1); // 1 year total
      }

      userData.subscription = {
        create: {
          planId: planStatus.planId,
          pricingId: planStatus.pricingId,
          startDate: startDate,
          trialEndDate: trialEndDate,
          endDate: endDate,
          // Add other subscription details as needed
        }
      };
    }

    const user = await client.user.create({
      data: userData,
      include: {stores: true}
    });

    return { status: "success", message: "User created successfully", data: user };

  } catch (error) {
    console.error('Error creating user:', error);
    return { status: "error", message: error.message, data: null };
  }
}


export async function checkUserFinishOnboarding() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) return { status: "clerkUserNotFound", message: "clerk User not found", data: null }

    const user = await client.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        stores: true
      }
    })

    if (!user) return { status: "userNotFound", message: "user not found in database", data: null }

    if (user.isActive) return { status: "userFinishedOnboarding", message: "", data: user }

    return { status: "userNotFinishedOnboarding", message: "", data: null }

  } catch (error) {
    console.log(error, "e e e e e e e e ")
  }
}

export async function verifyUser(userId) {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

    const user = await client.user.findUnique({
      where: {
        clerkId: clerkUser.id,
        id: userId
      },
      include: {
        subscription: true,
        stores: true
      }
    })

    if (!user) return { status: "userNotFound", message: "", data: null }

    if (user.isActive !== true) return { status: "userNotActive", message: "", data: user }
    if (!user.chapaSubAccountId) return { status: "dontHaveSubAccount", message: "", data: user }

    return { status: "success", message: "User have access", data: user }

  } catch (error) {
    throw error
  }
}

export async function getUserByClerkId(clerkId) {
  try {
    const user = await client.user.findUnique({
      where: { clerkId: clerkId },
      include: {
        subscription: true,
        store: true
      }
    })

    return user
  } catch (error) {
    throw error
  }
}


export async function getUser() {
  try {
    const clerkUser = await currentUser()
    if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

    const user = await client.user.findUnique({
      where: {
        clerkId: clerkUser.id
      },
      include: {
        subscription: true,
        stores: true
      }
    })

    if (!user) return { status: "userNotFound", message: "", data: null }

    return { status: "success", message: "", data: user }
  } catch (error) {
    throw error
  }
}

export async function hasAccessToOnboarding() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) return { status: "clerkUserNotFound", message: "", data: null }

    const user = await client.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        subscription: true,
        stores: true
      }
    })

    if (user) return { status: "userFinishedOnboarding", message: "", data: user }

    return { status: "success", message: "", data: null }
  } catch (error) {
    throw error
  }
}