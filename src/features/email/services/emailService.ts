//src/features/email/services/emailService.ts
import { sendEmail, sendBulkEmails } from '@/shared/lib/email'
import {
    EmailVariables,
    NewsletterEmailData,
    WelcomeEmailData,
    PasswordResetEmailData,
    SubscriptionEmailData
} from '../types/email.types'

class EmailService {
    // Template email de bienvenue
    private getWelcomeEmailTemplate(variables: EmailVariables) {
        const subject = `Bienvenue dans ${variables.siteName} ! 🎉`

        const html = `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1>🎉 Bienvenue !</h1>
                    <p>Merci de rejoindre ${variables.siteName}</p>
                </div>
                
                <div style="background: white; padding: 30px; border: 1px solid #e1e5e9;">
                    <p>Bonjour <strong>${variables.userName}</strong>,</p>
                    
                    <p>Félicitations ! Votre compte a été créé avec succès. Vous faites maintenant partie de notre communauté d'investisseurs avertis.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${variables.loginUrl}" style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Accéder à mon compte
                        </a>
                    </div>
                    
                    <h3>🚀 Ce que vous pouvez faire maintenant :</h3>
                    
                    <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #007bff;">
                        <strong>📈 Consulter les analyses</strong><br>
                        Accédez à nos analyses exclusives d'actions et de secteurs
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #007bff;">
                        <strong>💼 Découvrir nos sélections</strong><br>
                        Explorez nos portefeuilles thématiques et recommandations
                    </div>
                    
                    <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #007bff;">
                        <strong>📧 Recevoir les newsletters</strong><br>
                        Configurez vos préférences pour recevoir nos contenus quotidiens et hebdomadaires
                    </div>
                    
                    <p>Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:${variables.supportEmail}">${variables.supportEmail}</a>.</p>
                    
                    <p>Bonne lecture et bons investissements ! 📊</p>
                    
                    <p>L'équipe ${variables.siteName}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e1e5e9; border-top: none;">
                    <p>Vous recevez cet email car vous vous êtes inscrit sur ${variables.siteName}</p>
                    <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
                </div>
            </div>
        `

        return { subject, html }
    }

    // Template newsletter quotidienne
    private getDailyNewsletterTemplate(variables: EmailVariables) {
        const subject = `📈 ${variables.newsletterTitle}`

        const html = `
            <div style="max-width: 600px; margin: 0 auto; background: white; font-family: Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%); color: white; padding: 20px; text-align: center;">
                    <h1>📈 Newsletter Quotidienne</h1>
                    <div style="background: #007bff; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; display: inline-block;">
                        ${variables.publishedAt}
                    </div>
                </div>
                
                <div style="padding: 30px 20px;">
                    <p>Bonjour <strong>${variables.userName}</strong>,</p>
                    
                    <div style="margin: 25px 0; padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
                        <h2>${variables.newsletterTitle}</h2>
                        ${variables.newsletterExcerpt ? `<p><em>${variables.newsletterExcerpt}</em></p>` : ''}
                        
                        <div style="color: #666; font-style: italic; margin: 10px 0;">
                            Par ${variables.authorName || 'L\'équipe éditoriale'} • ${variables.publishedAt}
                        </div>
                        
                        <div style="margin: 20px 0;">
                            ${variables.newsletterContent}
                        </div>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${variables.newsletterUrl}" style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Lire l'article complet
                            </a>
                        </div>
                    </div>
                    
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <strong>💡 Le saviez-vous ?</strong> En tant qu'abonné, vous avez accès à toutes nos archives et analyses exclusives.
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                    <p>Vous recevez cette newsletter car vous êtes abonné à nos contenus quotidiens.</p>
                    <p><a href="${variables.unsubscribeUrl}">Se désabonner</a> | <a href="${variables.siteUrl}">Visiter le site</a></p>
                    <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
                </div>
            </div>
        `

        return { subject, html }
    }

    // Template newsletter hebdomadaire
    private getWeeklyNewsletterTemplate(variables: EmailVariables) {
        const subject = `📊 ${variables.newsletterTitle}`

        const html = `
            <div style="max-width: 600px; margin: 0 auto; background: white; font-family: Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
                    <h1>📊 Newsletter Hebdomadaire</h1>
                    <p>Votre résumé de la semaine</p>
                    <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block;">
                        ${variables.publishedAt}
                    </div>
                </div>
                
                <div style="padding: 30px 20px;">
                    <p>Bonjour <strong>${variables.userName}</strong>,</p>
                    
                    <div style="background: #e7f3ff; border-left: 4px solid #007bff; padding: 20px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #007bff;">📈 Résumé de la semaine</h3>
                        <p>Voici les points essentiels à retenir de cette semaine sur les marchés financiers.</p>
                    </div>
                    
                    <div style="margin: 30px 0;">
                        <h2>${variables.newsletterTitle}</h2>
                        ${variables.newsletterExcerpt ? `<p><strong>${variables.newsletterExcerpt}</strong></p>` : ''}
                        
                        <div style="color: #666; margin: 15px 0;">
                            Par ${variables.authorName || 'L\'équipe éditoriale'} • ${variables.publishedAt}
                        </div>
                        
                        <div>
                            ${variables.newsletterContent}
                        </div>
                        
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${variables.newsletterUrl}" style="display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                Lire l'analyse complète
                            </a>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                    <p>Vous recevez cette newsletter hebdomadaire car vous êtes abonné à nos contenus.</p>
                    <p><a href="${variables.unsubscribeUrl}">Se désabonner</a> | <a href="${variables.siteUrl}">Visiter le site</a></p>
                    <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
                </div>
            </div>
        `

        return { subject, html }
    }

    // Template réinitialisation mot de passe
    private getPasswordResetTemplate(variables: EmailVariables) {
        const subject = `Réinitialisation de votre mot de passe - ${variables.siteName}`

        const html = `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <div style="background: #dc3545; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1>🔐 Réinitialisation du mot de passe</h1>
                </div>
                
                <div style="background: white; padding: 30px 20px; border: 1px solid #e1e5e9;">
                    <p>Bonjour <strong>${variables.userName}</strong>,</p>
                    
                    <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte <strong>${variables.userEmail}</strong>.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${variables.resetUrl}" style="display: inline-block; background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Réinitialiser mon mot de passe
                        </a>
                    </div>
                    
                    <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0;">
                        <strong>⚠️ Important :</strong> Ce lien expire le <strong>${variables.expiresAt}</strong>. 
                        Si vous ne réinitialisez pas votre mot de passe avant cette date, vous devrez refaire une demande.
                    </div>
                    
                    <p><strong>Vous n'avez pas demandé cette réinitialisation ?</strong></p>
                    <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email. Votre mot de passe actuel reste valide.</p>
                    
                    <p>Pour toute question, contactez notre support à <a href="mailto:${variables.supportEmail}">${variables.supportEmail}</a>.</p>
                    
                    <p>L'équipe ${variables.siteName}</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e1e5e9; border-top: none;">
                    <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
                    <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
                </div>
            </div>
        `

        return { subject, html }
    }

    // Envoyer un email de bienvenue
    async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
        try {
            const variables: EmailVariables = {
                userName: data.user.name || 'Cher abonné',
                userEmail: data.user.email,
                loginUrl: data.loginUrl,
                supportEmail: data.supportEmail,
                siteName: 'Newsletter Financière',
                siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://newsletter.com'
            }

            const { subject, html } = this.getWelcomeEmailTemplate(variables)

            return await sendEmail({
                to: data.user.email,
                subject,
                html
            })
        } catch (error) {
            console.error('Error sending welcome email:', error)
            return false
        }
    }

    // Envoyer une newsletter quotidienne
    async sendDailyNewsletter(data: NewsletterEmailData): Promise<boolean> {
        try {
            const variables: EmailVariables = {
                userName: data.user.name || 'Cher abonné',
                userEmail: data.user.email,
                newsletterTitle: data.newsletter.title,
                newsletterContent: data.newsletter.content,
                newsletterExcerpt: data.newsletter.excerpt,
                authorName: data.newsletter.authorName,
                publishedAt: data.newsletter.publishedAt.toLocaleDateString('fr-FR'),
                siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://newsletter.com',
                newsletterUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/archives/${data.newsletter.slug}`,
                unsubscribeUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${data.unsubscribeToken}`
            }

            const { subject, html } = this.getDailyNewsletterTemplate(variables)

            return await sendEmail({
                to: data.user.email,
                subject,
                html,
                headers: {
                    'List-Unsubscribe': `<${variables.unsubscribeUrl}>`,
                    'X-Newsletter-Type': 'daily'
                }
            })
        } catch (error) {
            console.error('Error sending daily newsletter:', error)
            return false
        }
    }

    // Envoyer une newsletter hebdomadaire
    async sendWeeklyNewsletter(data: NewsletterEmailData): Promise<boolean> {
        try {
            const variables: EmailVariables = {
                userName: data.user.name || 'Cher abonné',
                userEmail: data.user.email,
                newsletterTitle: data.newsletter.title,
                newsletterContent: data.newsletter.content,
                newsletterExcerpt: data.newsletter.excerpt,
                authorName: data.newsletter.authorName,
                publishedAt: data.newsletter.publishedAt.toLocaleDateString('fr-FR'),
                siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://newsletter.com',
                newsletterUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/archives/${data.newsletter.slug}`,
                unsubscribeUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?token=${data.unsubscribeToken}`
            }

            const { subject, html } = this.getWeeklyNewsletterTemplate(variables)

            return await sendEmail({
                to: data.user.email,
                subject,
                html,
                headers: {
                    'List-Unsubscribe': `<${variables.unsubscribeUrl}>`,
                    'X-Newsletter-Type': 'weekly'
                }
            })
        } catch (error) {
            console.error('Error sending weekly newsletter:', error)
            return false
        }
    }

    // Envoyer un email de réinitialisation de mot de passe
    async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<boolean> {
        try {
            const variables: EmailVariables = {
                userName: data.user.name || 'Cher utilisateur',
                userEmail: data.user.email,
                resetUrl: data.resetUrl,
                resetToken: data.resetToken,
                expiresAt: data.expiresAt.toLocaleString('fr-FR'),
                siteName: 'Newsletter Financière',
                supportEmail: process.env.SUPPORT_EMAIL || 'support@newsletter.com'
            }

            const { subject, html } = this.getPasswordResetTemplate(variables)

            return await sendEmail({
                to: data.user.email,
                subject,
                html,
                headers: {
                    'X-Priority': '1', // Haute priorité pour les emails de sécurité
                    'X-Email-Type': 'password-reset'
                }
            })
        } catch (error) {
            console.error('Error sending password reset email:', error)
            return false
        }
    }

    // Envoyer un email de confirmation d'abonnement
    async sendSubscriptionConfirmationEmail(data: SubscriptionEmailData): Promise<boolean> {
        try {
            const variables: EmailVariables = {
                userName: data.user.name || 'Cher abonné',
                userEmail: data.user.email,
                planName: data.subscription.plan,
                amount: data.subscription.amount,
                currency: data.subscription.currency,
                nextBillingDate: data.subscription.nextBillingDate?.toLocaleDateString('fr-FR'),
                invoiceUrl: data.invoiceUrl,
                siteName: 'Newsletter Financière',
                supportEmail: process.env.SUPPORT_EMAIL || 'support@newsletter.com'
            }

            const subject = `Confirmation d'abonnement - Plan ${data.subscription.plan}`
            const html = `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                    <h2>Merci pour votre abonnement !</h2>
                    <p>Bonjour ${variables.userName},</p>
                    <p>Votre abonnement au plan <strong>${data.subscription.plan}</strong> a été confirmé.</p>
                    <p><strong>Détails :</strong></p>
                    <ul>
                        <li>Plan : ${data.subscription.plan}</li>
                        <li>Montant : ${data.subscription.amount}${data.subscription.currency}</li>
                        ${data.subscription.nextBillingDate ? `<li>Prochaine facturation : ${variables.nextBillingDate}</li>` : ''}
                    </ul>
                    ${data.invoiceUrl ? `<p><a href="${data.invoiceUrl}">Télécharger la facture</a></p>` : ''}
                    <p>Merci pour votre confiance !</p>
                </div>
            `

            return await sendEmail({
                to: data.user.email,
                subject,
                html,
                headers: {
                    'X-Email-Type': 'subscription-confirmation'
                }
            })
        } catch (error) {
            console.error('Error sending subscription confirmation email:', error)
            return false
        }
    }

    // Envoyer des emails en masse à tous les abonnés
    async sendNewsletterToSubscribers(
        newsletterId: string,
        type: 'daily' | 'weekly' = 'daily'
    ): Promise<{ success: number; failed: number }> {
        try {
            // Simulation avec données statiques
            const mockSubscribers = [
                {
                    id: '1',
                    email: 'user1@example.com',
                    name: 'Jean Dupont',
                    preferences: { receiveDaily: true, receiveWeekly: true }
                },
                {
                    id: '2',
                    email: 'user2@example.com',
                    name: 'Marie Martin',
                    preferences: { receiveDaily: true, receiveWeekly: true }
                }
            ]

            // Préparer les emails
            const emails = mockSubscribers.map(user => ({
                to: user.email,
                subject: type === 'daily'
                    ? `📈 Newsletter quotidienne - ${new Date().toLocaleDateString('fr-FR')}`
                    : `📊 Newsletter hebdomadaire - Semaine du ${new Date().toLocaleDateString('fr-FR')}`,
                html: `
                    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                        <h2>Newsletter ${type === 'daily' ? 'quotidienne' : 'hebdomadaire'}</h2>
                        <p>Bonjour ${user.name || 'Cher abonné'},</p>
                        <p>Voici votre newsletter ${type === 'daily' ? 'quotidienne' : 'hebdomadaire'}.</p>
                        <!-- Contenu de la newsletter ici -->
                        <hr>
                        <p><small><a href="#">Se désabonner</a></small></p>
                    </div>
                `,
                headers: {
                    'List-Unsubscribe': '<https://newsletter.com/unsubscribe>',
                    'X-Newsletter-Type': type
                }
            }))

            // Envoyer en masse avec limitation
            return await sendBulkEmails(emails, {
                batchSize: 50,
                delayBetweenBatches: 2000 // 2 secondes entre les lots
            })
        } catch (error) {
            console.error('Error sending newsletter to subscribers:', error)
            return { success: 0, failed: 0 }
        }
    }

    // Envoyer une notification aux administrateurs
    async sendAdminNotification(
        subject: string,
        message: string,
        priority: 'low' | 'normal' | 'high' = 'normal'
    ): Promise<boolean> {
        try {
            const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['admin@newsletter.com']

            const html = `
                <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                    <h2>Notification Administrateur</h2>
                    <p><strong>Sujet :</strong> ${subject}</p>
                    <p><strong>Message :</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                        ${message}
                    </div>
                    <hr>
                    <p><small>Envoyé automatiquement depuis Newsletter Financière</small></p>
                </div>
            `

            return await sendEmail({
                to: adminEmails,
                subject: `[ADMIN] ${subject}`,
                html,
                headers: {
                    'X-Priority': priority === 'high' ? '1' : priority === 'low' ? '5' : '3',
                    'X-Email-Type': 'admin-notification'
                }
            })
        } catch (error) {
            console.error('Error sending admin notification:', error)
            return false
        }
    }
}

export const emailService = new EmailService()