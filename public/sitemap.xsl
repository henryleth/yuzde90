<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap - Turquiana</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <style type="text/css">
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        color: #333;
                        background: #fff;
                        margin: 0;
                        padding: 20px;
                    }
                    h1 {
                        font-size: 24px;
                        margin: 0 0 10px 0;
                        color: #000;
                    }
                    p.description {
                        margin: 0 0 20px 0;
                        color: #666;
                    }
                    .stats {
                        background: #f5f5f5;
                        border: 1px solid #ddd;
                        padding: 10px;
                        margin: 0 0 20px 0;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 0 0 30px 0;
                    }
                    th {
                        background: #f5f5f5;
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                        font-weight: bold;
                    }
                    td {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    tr:nth-child(even) {
                        background: #fafafa;
                    }
                    a {
                        color: #0066cc;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                    .priority {
                        text-align: center;
                    }
                    .high {
                        color: #ff6600;
                        font-weight: bold;
                    }
                    .medium {
                        color: #0066cc;
                    }
                    .low {
                        color: #666;
                    }
                    h2 {
                        font-size: 18px;
                        margin: 30px 0 10px 0;
                        padding: 5px 0;
                        border-bottom: 1px solid #ddd;
                    }
                    .footer {
                        margin: 40px 0 20px 0;
                        padding: 20px 0 0 0;
                        border-top: 1px solid #ddd;
                        color: #666;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <h1>XML Sitemap</h1>
                <p class="description">
                    This is a XML Sitemap which is supposed to be processed by search engines like Google, Bing, Yahoo and others.<br/>
                    Generated for <a href="https://turquiana.com">turquiana.com</a>
                </p>
                
                <div class="stats">
                    <strong>Statistics:</strong>
                    Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> |
                    Tours: <xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tours/')])"/> |
                    Destinations: <xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/destinations/')])"/> |
                    Blog Posts: <xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/contents/') or contains(sitemap:loc, '/blog/')])"/>
                </div>

                <!-- Main Pages -->
                <h2>Main Pages</h2>
                <table>
                    <thead>
                        <tr>
                            <th width="50%">URL</th>
                            <th>Last Modified</th>
                            <th>Change Frequency</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="sitemap:urlset/sitemap:url[not(contains(sitemap:loc, '/tours/')) and not(contains(sitemap:loc, '/destinations/')) and not(contains(sitemap:loc, '/contents/')) and not(contains(sitemap:loc, '/blog/'))]">
                            <tr>
                                <td>
                                    <a target="_blank">
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </xsl:attribute>
                                        <xsl:value-of select="sitemap:loc"/>
                                    </a>
                                </td>
                                <td>
                                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                                </td>
                                <td>
                                    <xsl:value-of select="sitemap:changefreq"/>
                                </td>
                                <td class="priority">
                                    <xsl:choose>
                                        <xsl:when test="sitemap:priority >= 0.8">
                                            <span class="high"><xsl:value-of select="sitemap:priority"/></span>
                                        </xsl:when>
                                        <xsl:when test="sitemap:priority >= 0.5">
                                            <span class="medium"><xsl:value-of select="sitemap:priority"/></span>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <span class="low"><xsl:value-of select="sitemap:priority"/></span>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>

                <!-- Tours -->
                <xsl:if test="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tours/')]) > 0">
                    <h2>Tours (<xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tours/')])"/> URLs)</h2>
                    <table>
                        <thead>
                            <tr>
                                <th width="60%">URL</th>
                                <th>Last Modified</th>
                                <th>Priority</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/tours/')]">
                                <tr>
                                    <td>
                                        <a target="_blank">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="sitemap:loc"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                                    </td>
                                    <td class="priority">
                                        <xsl:value-of select="sitemap:priority"/>
                                    </td>
                                    <td>
                                        <xsl:if test="image:image">Yes</xsl:if>
                                        <xsl:if test="not(image:image)">No</xsl:if>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </xsl:if>

                <!-- Destinations -->
                <xsl:if test="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/destinations/')]) > 0">
                    <h2>Destinations (<xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/destinations/')])"/> URLs)</h2>
                    <table>
                        <thead>
                            <tr>
                                <th width="60%">URL</th>
                                <th>Last Modified</th>
                                <th>Priority</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/destinations/')]">
                                <tr>
                                    <td>
                                        <a target="_blank">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="sitemap:loc"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                                    </td>
                                    <td class="priority">
                                        <xsl:value-of select="sitemap:priority"/>
                                    </td>
                                    <td>
                                        <xsl:if test="image:image">Yes</xsl:if>
                                        <xsl:if test="not(image:image)">No</xsl:if>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </xsl:if>

                <!-- Blog Posts -->
                <xsl:if test="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/contents/') or contains(sitemap:loc, '/blog/')]) > 0">
                    <h2>Blog Posts (<xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/contents/') or contains(sitemap:loc, '/blog/')])"/> URLs)</h2>
                    <table>
                        <thead>
                            <tr>
                                <th width="60%">URL</th>
                                <th>Last Modified</th>
                                <th>Priority</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url[contains(sitemap:loc, '/contents/') or contains(sitemap:loc, '/blog/')]">
                                <tr>
                                    <td>
                                        <a target="_blank">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="sitemap:loc"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td>
                                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                                    </td>
                                    <td class="priority">
                                        <xsl:value-of select="sitemap:priority"/>
                                    </td>
                                    <td>
                                        <xsl:if test="image:image">Yes</xsl:if>
                                        <xsl:if test="not(image:image)">No</xsl:if>
                                    </td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                </xsl:if>

                <div class="footer">
                    <p>This XML Sitemap is automatically generated and updated.</p>
                    <p>Learn more about <a href="https://www.sitemaps.org/" target="_blank">XML Sitemaps</a> on sitemaps.org</p>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>