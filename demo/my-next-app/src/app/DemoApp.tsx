"use client"; 

import React, { useEffect, useState } from 'react';
import PowerBIEmbedComponent from './components/PowerBIEmbedComponent';
import { models } from 'powerbi-client';
import getAccessToken from './getAccessToken';

const ReportPage: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const token = await getAccessToken();
                setAccessToken(token);
            } catch (error) {
                console.error('Failed to fetch access token', error);
            }
        };

        fetchAccessToken();
    }, []);

    if (!accessToken) {
        return <div>Loading...</div>;
    }

    const embedConfig = {
        type: 'report', 
        id: 'a7483070-e444-4076-a0c2-b7c4095ca526',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=a7483070-e444-4076-a0c2-b7c4095ca526',
        accessToken: accessToken, 
        tokenType: models.TokenType.Embed,
        settings: {
            panes: {
                filters: {
                    expanded: false,
                    visible: false
                }
            }
        }
    };

    return (
        <div className="report-container">
            <h1>Power BI Embedded Report</h1>
            <PowerBIEmbedComponent embedConfig={embedConfig} />
        </div>
    );
};

export default ReportPage;
