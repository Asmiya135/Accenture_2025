"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Contact = {
  name: string
  relation: string
  phone: string
}

export function MyLocation() {
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Suresh Kumar", relation: "Son", phone: "9876543210" },
    { name: "Dr. Patel", relation: "Doctor", phone: "9876123450" },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newContact, setNewContact] = useState<Contact>({ name: "", relation: "", phone: "" })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, newContact])
      setNewContact({ name: "", relation: "", phone: "" })
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-bold mb-2">My Location</h2>
        <p className="text-xl text-muted-foreground">Find nearby hospitals and manage emergency contacts</p>
      </div>

      <Card className="bg-card shadow-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Nearby Hospitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg bg-muted p-4 w-full">
            <div className="h-64 w-full bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-lg text-muted-foreground">Map showing nearby hospitals</p>
            </div>
            <div className="space-y-4 w-full">
              <div className="flex items-start gap-4 rounded-md bg-background p-4 w-full">
                <MapPin className="mt-1 h-6 w-6 text-secondary" />
                <div className="flex-1">
                  <h4 className="text-xl font-medium">City Hospital</h4>
                  <p className="text-lg text-muted-foreground">1.2 km away - 123 Main St</p>
                  <p className="text-lg font-medium text-secondary">Emergency: 102</p>
                  <Button className="mt-2 text-base">Send Alert</Button>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-md bg-background p-4 w-full">
                <MapPin className="mt-1 h-6 w-6 text-secondary" />
                <div className="flex-1">
                  <h4 className="text-xl font-medium">Apollo Medical Center</h4>
                  <p className="text-lg text-muted-foreground">2.5 km away - 456 Park Ave</p>
                  <p className="text-lg font-medium text-secondary">Emergency: 9876543210</p>
                  <Button className="mt-2 text-base">Send Alert</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-medium">Emergency Contacts</h3>
              <Button
                variant="outline"
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 text-base"
              >
                <Plus className="h-5 w-5" />
                Add Contact
              </Button>
            </div>

            {showForm && (
              <div className="mb-6 rounded-lg border p-4 w-full">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-base mb-1 block">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        className="text-lg h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="relation" className="text-base mb-1 block">
                        Relation
                      </Label>
                      <Input
                        id="relation"
                        value={newContact.relation}
                        onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                        className="text-lg h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base mb-1 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      className="text-lg h-12"
                    />
                  </div>
                  <Button onClick={handleAddContact} className="text-lg h-12">
                    Save Contact
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3 w-full">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-start gap-4 rounded-md bg-muted p-4 w-full">
                  <User className="mt-1 h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h4 className="text-xl font-medium">{contact.name}</h4>
                    <p className="text-lg text-muted-foreground">{contact.relation}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Phone className="h-5 w-5 text-secondary" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

