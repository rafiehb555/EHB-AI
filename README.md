# EHB AI Project (Next.js + MongoDB)

**Yeh project ab 100% Next.js aur MongoDB pe migrate ho chuka hai!**

---

## Roman Urdu Summary

- Ab sab kuch Next.js pages aur API routes pe hai
- Wallet, agents, phases, db, realtime — sab modules MongoDB pe hain
- Koi legacy Express ya in-memory logic nahi raha
- Setup, run, ya deploy karna asaan hai

---

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **.env.local file banayein aur MongoDB URI set karein:**
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/ehb-ai-project?retryWrites=true&w=majority
   ```
3. **Next.js app run karein:**
   ```bash
   npm run dev
   ```
4. **API endpoints test karein (Postman ya browser se):**
   - Example: `http://localhost:3000/api/wallet/get-address?userId=USER123&type=ERC20`

---

## API Endpoints Summary

### Wallet
- `POST /api/wallet/set-address` — userId, type, address
- `GET /api/wallet/get-address?userId=...&type=...`
- `GET /api/wallet/get-balance?userId=...&type=...`
- `POST /api/wallet/transfer` — userId, type, to, amount

### Agents
- `POST /api/agents/create-agent` — agentId, name, description, type
- `GET /api/agents/get-agent?agentId=...`
- `GET /api/agents/get-agents`
- `PUT /api/agents/update-agent?agentId=...` — name, description, type
- `DELETE /api/agents/delete-agent?agentId=...`

### Phases
- `POST /api/phases/create-phase` — phaseId, name, description, startDate, endDate
- `GET /api/phases/get-phase?phaseId=...`
- `GET /api/phases/get-phases`
- `PUT /api/phases/update-phase?phaseId=...` — name, description, startDate, endDate
- `DELETE /api/phases/delete-phase?phaseId=...`

### DB
- `POST /api/db/connect`
- `POST /api/db/disconnect`
- `POST /api/db/query` — collection, method, args[]

### Realtime
- `POST /api/realtime/connect` — userId
- `POST /api/realtime/disconnect` — userId
- `POST /api/realtime/send-message` — userId, message

---

## Usage Example

```bash
curl -X POST http://localhost:3000/api/wallet/set-address \
  -H 'Content-Type: application/json' \
  -d '{"userId":"USER123","type":"ERC20","address":"0x..."}'
```

---

## Deployment

- Vercel, Netlify, ya kisi bhi Node.js server pe deploy kar sakte hain
- MongoDB Atlas (cloud) ya local MongoDB instance ka URI .env.local mein set karen

---

**Koi masla ho ya aur migration chahiye ho to roman urdu mein "next" likhein!** 