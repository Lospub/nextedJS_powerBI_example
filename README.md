# Power BI Embedded in Next.js Example

This repository demonstrates how to embed a Power BI report into a simple **Next.js** application using **Azure Active Directory (Azure AD)** and the **Power BI REST API**.

---

## 🔧 Prerequisites and Embedded Setup

### 1. Power BI Configuration

#### ✅ Admin Portal (Tenant Settings)

- Navigate to **Power BI Admin Portal** → **Tenant Settings**
- Enable:
  - ✅ *Allow service principals to use Fabric APIs*
  - ✅ Restrict access to specific **security groups** (recommended)

#### ✅ Workspace Configuration

- Add your **Azure AD app** (service principal) to the **Power BI workspace**
- Locate the **workspace (group) ID** and **report ID** from the **embed URL**

---

### 2. Azure AD Configuration

#### ✅ App Registration

- Go to **Microsoft Entra ID (Azure AD)** → **App registrations**
- Register a new app
- Configure API permissions:
  - Add delegated permission for `Power BI Service`
  - Consent to the permission
- Generate a **Client Secret**
- (Optional) Add yourself as an **Owner**

#### ✅ Security Groups (AAD)

- Create a **Security Group**
- Add:
  - Your **Azure AD app** as a **member**
  - Any relevant **admin users**

> 💡 The **same security group** must be used in both **Azure AD** and **Power BI**.

---

## 🔐 Authentication Flow

### Step 1: Get Bearer Token (Azure AD)

**Endpoint:**

```
POST https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token
```

**Request Body (x-www-form-urlencoded):**

| Key             | Value                                                              |
|------------------|--------------------------------------------------------------------|
| `grant_type`     | `client_credentials`                                               |
| `client_id`      | `<your_client_id>`                                                 |
| `client_secret`  | `<your_client_secret>`                                             |
| `scope`          | `https://analysis.windows.net/powerbi/api/.default`               |

**Response:**

- You will receive a **Bearer Token**

---

### Step 2: Get Power BI Embed Token

**Endpoint:**

```
POST https://api.powerbi.com/v1.0/myorg/groups/{groupId}/reports/{reportId}/GenerateToken
```

> **Note:** At minimum, `accessLevel` and `allowSaveAs` are required. Additional options like `datasetId`, `identities`, and `lifetimeInMinutes` are optional depending on your use case.

**Request Body (JSON):**

```json
{
  "accessLevel": "View",                      // [Required] Access level for embedding (e.g., View, Edit)
  "allowSaveAs": true,                        // [Required] Allows saving embedded report as a new one
  "datasetId": "<optional_dataset_id>",      // [Optional] For report creation scenarios
  "identities": [                             // [Optional] Row-level security rules
    {
      "username": "<user@example.com>",
      "roles": ["<role>"]
    }
  ],
  "lifetimeInMinutes": 60                    // [Optional] Token validity duration in minutes
}
```

**Response:**

- Returns an **Embed Token** needed for embedding the report

---

## 🧹 Embedding in React

Once you have the **embed token**, you can use it in the frontend with libraries such as:

- [`powerbi-client-react`](https://www.npmjs.com/package/powerbi-client-react)
- Or embed manually using `<iframe>` or Power BI JS SDK

---

## 🗂️ Environment Variables

Store secrets in `.env.local`:

```env
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
POWERBI_WORKSPACE_ID=your-workspace-id
POWERBI_REPORT_ID=your-report-id
```

---