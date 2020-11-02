<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arqsite/index.html">
            
            <html>
                <head>
                    <title>Arqueossítios do Noroeste Português</title>
                </head>
                <body>
                    <h1 style="color:Orange;">Arqueossítios do Noroeste Português</h1>
                    <ul>
                        <xsl:apply-templates mode="indice" select="//ARQELEM">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
            
        </xsl:result-document>
        <xsl:apply-templates mode="individual"/>
    </xsl:template>
    
    <!-- Templates para o índice -->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
                
            </a>
        </li>
        
    </xsl:template>
    
    <!-- Templates para o conteúdo -->
    
    <xsl:template match="ARQELEM" mode="individual">
        <xsl:result-document href="arqsite/{generate-id()}.html">
            
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    <p><b style="color:Orange;">Nome :</b>  <xsl:value-of select="IDENTI"/></p>
                    <p><b style="color:Orange;">Localização :</b> 
                        <xsl:value-of select="LUGAR"/> , 
                        <xsl:value-of select="FREGUE"/>,
                        <xsl:value-of select="CONCEL"/></p>        
                    
                    <p><b style="color:Orange;">Latitude:</b><xsl:value-of select="LATITU"/> </p>
                    <p><b style="color:Orange;">Longitude:</b><xsl:value-of select="LONGIT"/></p>
                    <p><b style="color:Orange;">Altitude:</b><xsl:value-of select="ALTITU"/></p>
                    <p><b style="color:Orange;">Acesso:</b><xsl:value-of select="ACESSO"/></p>
                    <p><b style="color:Orange;">Quadro:</b><xsl:value-of select="QUADRO"/></p>
                    <p><b style="color:Orange;">Características:</b><xsl:value-of select="DESARQ"/></p>
                    <p><b style="color:Orange;">Acesso:</b><xsl:value-of select="ACESSO"/></p>
                    <p><b style="color:Orange;">Categoria:</b><xsl:value-of select="INTERP"/></p>
                    <p><b style="color:Orange;">Depósito:</b><xsl:value-of select="DEPOSI"/></p>
                    <p><b style="color:Orange;">Bibliografia:</b><xsl:value-of select="BIBLIO"/></p>
                    <p><b style="color:Orange;">Autor:</b><xsl:value-of select="AUTOR"/></p>
                    <p><b style="color:Orange;">Data:</b><xsl:value-of select="DATA"/></p>
                    
                    <address>
                        [
                        <a href="index.html#i{generate-id()}">Voltar ao índice</a>
                        ]
                    </address>
                </body>
            </html>
            
            
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>