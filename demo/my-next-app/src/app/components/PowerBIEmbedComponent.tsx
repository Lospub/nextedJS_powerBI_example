"use client";
import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

interface EmbedConfig {
    type: string;
    id: string;
    embedUrl: string;
    accessToken: string;
    tokenType: models.TokenType;
    settings: {
        panes: {
            filters: {
                expanded: boolean;
                visible: boolean;
            }
        }
    }
}

interface PowerBIEmbedComponentProps {
    embedConfig: EmbedConfig;
}

const PowerBIEmbedComponent: React.FC<PowerBIEmbedComponentProps> = ({ embedConfig }) => {
    const eventHandlers = new Map([
        ['loaded', () => console.log('Report loaded')],
        ['rendered', () => console.log('Report rendered')],
        ['error', (event: any) => console.log(event.detail)]
    ]);

    const cssClassName = 'report-style-class';
    const getEmbeddedComponent = (embeddedReport: any) => {
        window.Report = embeddedReport;
    };

    return (
        <PowerBIEmbed
            embedConfig={embedConfig}
            eventHandlers={eventHandlers}
            cssClassName={cssClassName}
            getEmbeddedComponent={getEmbeddedComponent}
        />
    );
};

export default PowerBIEmbedComponent;