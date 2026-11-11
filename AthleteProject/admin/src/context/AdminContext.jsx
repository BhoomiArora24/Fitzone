// Deprecated: All database entities (Trainers, Clubs, Members, Inquiries) are fetched
// directly from MongoDB using src/api services. Global Context is reserved exclusively
// for User Authentication in AuthContext.jsx.
export { AuthProvider, useAuth } from './AuthContext'
