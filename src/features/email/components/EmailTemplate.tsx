//src/features/email/templates/welcome-email.tsx
import { EmailVariables } from '../types/email.types'

export function welcomeEmailTemplate(variables: EmailVariables) {
    const subject = `Bienvenue dans ${variables.siteName} ! 🎉`

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e1e5e9; border-top: none; }
        .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .feature { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #007bff; }
        .social { margin: 10px 5px; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Bienvenue !</h1>
            <p>Merci de rejoindre ${variables.siteName}</p>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${variables.userName}</strong>,</p>
            
            <p>Félicitations ! Votre compte a été créé avec succès. Vous faites maintenant partie de notre communauté d'investisseurs avertis.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${variables.loginUrl}" class="button">Accéder à mon compte</a>
            </div>
            
            <h3>🚀 Ce que vous pouvez faire maintenant :</h3>
            
            <div class="feature">
                <strong>📈 Consulter les analyses</strong><br>
                Accédez à nos analyses exclusives d'actions et de secteurs
            </div>
            
            <div class="feature">
                <strong>💼 Découvrir nos sélections</strong><br>
                Explorez nos portefeuilles thématiques et recommandations
            </div>
            
            <div class="feature">
                <strong>📧 Recevoir les newsletters</strong><br>
                Configurez vos préférences pour recevoir nos contenus quotidiens et hebdomadaires
            </div>
            
            <div class="feature">
                <strong>⭐ Gérer vos favoris</strong><br>
                Sauvegardez vos articles préférés pour les retrouver facilement
            </div>
            
            <h3>🎯 Prochaines étapes :</h3>
            <ol>
                <li>Connectez-vous à votre compte</li>
                <li>Complétez votre profil</li>
                <li>Configurez vos préférences de contenu</li>
                <li>Explorez nos archives</li>
            </ol>
            
            <div style="background: #e7f3ff; border: 1px solid #b6d7ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <strong>💡 Conseil :</strong> Pour ne manquer aucune de nos analyses, ajoutez <strong>${variables.supportEmail}</strong> à vos contacts.
            </div>
            
            <p>Si vous avez des questions, n'hésitez pas à nous contacter à <a href="mailto:${variables.supportEmail}">${variables.supportEmail}</a>.</p>
            
            <p>Bonne lecture et bons investissements ! 📊</p>
            
            <p>L'équipe ${variables.siteName}</p>
        </div>
        
        <div class="footer">
            <p>Vous recevez cet email car vous vous êtes inscrit sur ${variables.siteName}</p>
            <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
            <div>
                <a href="${variables.siteUrl}" style="color: #007bff; text-decoration: none;">Visiter le site</a> |
                <a href="mailto:${variables.supportEmail}" style="color: #007bff; text-decoration: none;">Support</a>
            </div>
        </div>
    </div>
</body>
</html>`

    return { subject, html }
}

//src/features/email/templates/newsletter-daily.tsx
export function newsletterDailyTemplate(variables: EmailVariables) {
    const subject = `📈 ${variables.newsletterTitle}`

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .date { background: #007bff; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; }
        .article { margin: 25px 0; padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px; }
        .article h3 { color: #1a365d; margin-top: 0; }
        .author { color: #666; font-style: italic; margin: 10px 0; }
        .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .highlight { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .stats { background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📈 Newsletter Quotidienne</h1>
            <div class="date">${variables.publishedAt}</div>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${variables.userName}</strong>,</p>
            
            <div class="article">
                <h2>${variables.newsletterTitle}</h2>
                ${variables.newsletterExcerpt ? `<p><em>${variables.newsletterExcerpt}</em></p>` : ''}
                
                <div class="author">
                    Par ${variables.authorName || 'L\'équipe éditoriale'} • ${variables.publishedAt}
                </div>
                
                <div>
                    ${variables.newsletterContent}
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${variables.newsletterUrl}" class="button">Lire l'article complet</a>
                </div>
            </div>
            
            <div class="highlight">
                <strong>💡 Le saviez-vous ?</strong> En tant qu'abonné, vous avez accès à toutes nos archives et analyses exclusives.
            </div>
        </div>
        
        <div class="footer">
            <p>Vous recevez cette newsletter car vous êtes abonné à nos contenus quotidiens.</p>
            <p><a href="${variables.unsubscribeUrl}">Se désabonner</a> | <a href="${variables.siteUrl}">Visiter le site</a></p>
            <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`

    return { subject, html }
}

//src/features/email/templates/newsletter-weekly.tsx
export function newsletterWeeklyTemplate(variables: EmailVariables) {
    const subject = `📊 ${variables.newsletterTitle}`

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px 20px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .week-summary { background: #e7f3ff; border-left: 4px solid #007bff; padding: 20px; margin: 20px 0; }
        .section { margin: 30px 0; }
        .section h3 { color: #1a365d; border-bottom: 2px solid #e1e5e9; padding-bottom: 10px; }
        .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Newsletter Hebdomadaire</h1>
            <p>Votre résumé de la semaine</p>
            <div style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; display: inline-block;">
                ${variables.publishedAt}
            </div>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${variables.userName}</strong>,</p>
            
            <div class="week-summary">
                <h3 style="margin-top: 0; color: #007bff;">📈 Résumé de la semaine</h3>
                <p>Voici les points essentiels à retenir de cette semaine sur les marchés financiers.</p>
            </div>
            
            <div class="section">
                <h2>${variables.newsletterTitle}</h2>
                ${variables.newsletterExcerpt ? `<p><strong>${variables.newsletterExcerpt}</strong></p>` : ''}
                
                <div style="color: #666; margin: 15px 0;">
                    Par ${variables.authorName || 'L\'équipe éditoriale'} • ${variables.publishedAt}
                </div>
                
                <div>
                    ${variables.newsletterContent}
                </div>
                
                <div style="text-align: center; margin: 25px 0;">
                    <a href="${variables.newsletterUrl}" class="button">Lire l'analyse complète</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🔍 Cette semaine dans nos analyses</h3>
                <ul>
                    <li>Analyse sectorielle : Technologie européenne</li>
                    <li>Sélection momentum : Actions européennes</li>
                    <li>Focus macro : Politique monétaire BCE</li>
                </ul>
            </div>
            
            <div class="section">
                <h3>📅 La semaine prochaine</h3>
                <p>Restez connectés pour nos prochaines analyses et recommandations !</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Vous recevez cette newsletter hebdomadaire car vous êtes abonné à nos contenus.</p>
            <p><a href="${variables.unsubscribeUrl}">Se désabonner</a> | <a href="${variables.siteUrl}">Visiter le site</a></p>
            <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`

    return { subject, html }
}

//src/features/email/templates/password-reset.tsx
export function passwordResetTemplate(variables: EmailVariables) {
    const subject = `Réinitialisation de votre mot de passe - ${variables.siteName}`

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc3545; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border: 1px solid #e1e5e9; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; border: 1px solid #e1e5e9; border-top: none; }
        .button { display: inline-block; background: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .security-tip { background: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Réinitialisation du mot de passe</h1>
        </div>
        
        <div class="content">
            <p>Bonjour <strong>${variables.userName}</strong>,</p>
            
            <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte <strong>${variables.userEmail}</strong>.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${variables.resetUrl}" class="button">Réinitialiser mon mot de passe</a>
            </div>
            
            <div class="warning">
                <strong>⚠️ Important :</strong> Ce lien expire le <strong>${variables.expiresAt}</strong>. 
                Si vous ne réinitialisez pas votre mot de passe avant cette date, vous devrez refaire une demande.
            </div>
            
            <div class="security-tip">
                <strong>🛡️ Conseils de sécurité :</strong>
                <ul>
                    <li>Utilisez un mot de passe unique et complexe</li>
                    <li>Combinez lettres, chiffres et caractères spéciaux</li>
                    <li>Évitez les informations personnelles</li>
                    <li>Utilisez un gestionnaire de mots de passe</li>
                </ul>
            </div>
            
            <p><strong>Vous n'avez pas demandé cette réinitialisation ?</strong></p>
            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email. Votre mot de passe actuel reste valide.</p>
            
            <p>Pour toute question, contactez notre support à <a href="mailto:${variables.supportEmail}">${variables.supportEmail}</a>.</p>
            
            <p>L'équipe ${variables.siteName}</p>
        </div>
        
        <div class="footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
            <p>© 2024 ${variables.siteName}. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>`

    return { subject, html }
}