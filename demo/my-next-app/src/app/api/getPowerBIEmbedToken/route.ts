import { NextResponse } from 'next/server';
import axios from 'axios';
import qs from 'qs';

// Load environment variables
const tenantId = process.env.AZURE_TENANT_ID!;
const clientId = process.env.AZURE_CLIENT_ID!;
const clientSecret = process.env.AZURE_CLIENT_SECRET!;
const groupId = process.env.POWERBI_WORKSPACE_ID!;
const reportId = process.env.POWERBI_REPORT_ID!;

async function getBearerToken() {
    try {
        const response = await axios.post(
            `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
            qs.stringify({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
                scope: 'https://analysis.windows.net/powerbi/api/.default'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Bearer Token:', error);
        throw new Error('Failed to fetch Bearer Token');
    }
}

export async function POST() {
    try {
        // Step 1: Get the Bearer Token
        const bearerToken = await getBearerToken();

        // Step 2: Request Power BI Embed Token using the Bearer Token
        const tokenResponse = await axios.post(
            `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`,
            {
                accessLevel: 'View',
                allowSaveAs: true
            },
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Step 3: Return the Embed Token to the client
        return NextResponse.json({ token: tokenResponse.data.token });
    } catch (error) {
        console.error('Error fetching Power BI Embed Token:', error);
        return NextResponse.json({ error: 'Failed to fetch Power BI Embed Token' }, { status: 500 });
    }
}
