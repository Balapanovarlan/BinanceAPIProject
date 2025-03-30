import React, { useEffect, useState } from 'react'
import styles from './Transfer.module.css'
import { useWeb3 } from '../../hooks/useWeb3/useWeb3'
import { CirclePlus, CircleUserRound, Send } from 'lucide-react'

const Transfer = () => {
    const { sendETH } = useWeb3()
    const [receiver, setReceiver] = useState('')
    const [value, setValue] = useState('')
    const [selectedContact, setSelectedContact] = useState('')
    const [contacts, setContacts] = useState([])
    const [showNewContact, setShowNewContact] = useState(false)

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('favorites')) || []
        setContacts(storedContacts)
    }, [])

    const selectContact = (address) => {
        setReceiver(address)
        setSelectedContact(address)
    }

    const executeTransfer = () => {
        if (!receiver || !value) {
            alert('Please fill all fields')
            return
        }

        sendETH(receiver, value)

        if (!contacts.includes(receiver)) {
            const updatedContacts = [...contacts, receiver]
            setContacts(updatedContacts)
            localStorage.setItem('favorites', JSON.stringify(updatedContacts))
        }

        setReceiver('')
        setValue('')
        setSelectedContact('')
        setShowNewContact(false)
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.heading}>Quick Transfer</h2>
            </header>

            <div className={styles.contactsPanel}>
                <div className={styles.contactsGrid}>
                    {contacts.map((address, index) => (
                        <div 
                            key={index}
                            className={styles.contactItem}
                            data-tooltip={address}
                        >
                            <CircleUserRound
                                className={`${styles.contactIcon} ${
                                    selectedContact === address ? styles.activeContact : ''
                                }`}
                                onClick={() => selectContact(address)}
                                size={48}
                                strokeWidth={1.5}
                            />
                        </div>
                    ))}
                    <button 
                        className={styles.addButton}
                        onClick={() => setShowNewContact(true)}
                        aria-label="Add new contact"
                    >
                        <CirclePlus size={48} className={styles.plusIcon} />
                    </button>
                </div>
            </div>

            {showNewContact && (
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>Recipient Address:</label>
                    <input
                        type="text"
                        className={styles.addressInput}
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        placeholder="Enter 0x address..."
                        pattern="^0x[a-fA-F0-9]{40}$"
                    />
                </div>
            )}

            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Transfer Amount:</label>
                <div className={styles.amountWrapper}>
                    <input
                        type="number"
                        className={styles.amountInput}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="0.000 ETH"
                        step="0.001"
                        min="0"
                    />
                    <span className={styles.currency}>ETH</span>
                </div>
            </div>

            <button 
                className={styles.transferButton}
                onClick={executeTransfer}
                disabled={!receiver || !value}
            >
                <Send className={styles.buttonIcon} />
                Transfer Now
            </button>
        </section>
    )
}

export default Transfer