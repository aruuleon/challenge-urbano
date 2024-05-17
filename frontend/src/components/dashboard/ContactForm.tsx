import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Layout from "../../components/layout";
import { useForm } from 'react-hook-form';
import CreateContactRequest from '../../models/contact/CreateContactRequest';
import contactService from '../../services/ContactService';

function ContactForm() {
    const { authenticatedUser } = useAuth();
    const [error, setError] = useState<string>();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<CreateContactRequest>();

    const saveContact = async (createContactRequest: CreateContactRequest) => {
        try {
          await contactService.sendEmail(createContactRequest);
          reset();
          setError(null);
        } catch (error) {
          setError(error.response.data.message);
        }
    };

    return (
        <Layout>
            <h1 className="font-semibold text-3xl mb-5">Contact</h1>
            <hr />
            <form onSubmit={handleSubmit(saveContact)} className="space-y-4">
            <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input 
                        name="name" 
                        required 
                        {...register('name')}
                        className="input-form"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        name="email" 
                        required 
                        {...register('email')}
                        className="input-form"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mensaje</label>
                    <textarea 
                        name="text" 
                        required 
                        {...register('text')}
                        className="input-form"
                        rows={4}
                    />
                </div>
                <div>
                    <button type="submit" className="btn">
                        Enviar
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export default ContactForm;