// SOT-Technologies backend module placeholder

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'EHB Backend' }));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
