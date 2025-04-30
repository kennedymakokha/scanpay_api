import admin from 'firebase-admin';

// Initialize Firebase Admin with your service account
import serviceAccount from './../../firebase-adminsdk.json'; // Adjust the path to your service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// Function to send FCM push
export async function sendFcmPush(fcmToken: string, title: string, body: any) {
    try {
        const message = {
            token: fcmToken,
            notification: {
                title: title,
                body: body,
            },
            data: {
                customData: '12345',
            },
        };

        const response = await admin.messaging().send(message);
        console.log('Successfully sent FCM message:', response);
    } catch (error) {
        console.error('Error sending FCM push:', error);
    }
}

// Example usage:

