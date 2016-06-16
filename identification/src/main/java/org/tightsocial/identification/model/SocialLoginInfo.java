/*
 * The MIT License
 *
 * Copyright 2016 tightsocial.org.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.tightsocial.identification.model;

import org.tightsocial.common.sharedcontract.identification.LoginType;
import org.tightsocial.common.domain.EmbeddedValueObject;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */
public final class SocialLoginInfo extends EmbeddedValueObject {
    private static final long serialVersionUID = 8626310424799282677L;

    public SocialLoginInfo(String siteId, String name, String url, LoginType loginType) {
        this();
        this.siteId = siteId;
        this.name = name;
        this.url = url;
        this.loginType = loginType;
    }
    
    public SocialLoginInfo(){
        super();
    }
    
    private String siteId;

    /**
     * Get the value of siteId
     *
     * @return the value of siteId
     */
    public String getSiteId() {
        return siteId;
    }

    /**
     * Set the value of siteId
     *
     * @param siteId new value of siteId
     */
    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    private String name;

    /**
     * Get the value of name
     *
     * @return the value of name
     */
    public String getName() {
        return name;
    }

    /**
     * Set the value of name
     *
     * @param name new value of name
     */
    public void setName(String name) {
        this.name = name;
    }

    private String url;

    /**
     * Get the value of url
     *
     * @return the value of url
     */
    public String getUrl() {
        return url;
    }

    /**
     * Set the value of url
     *
     * @param url new value of url
     */
    public void setUrl(String url) {
        this.url = url;
    }

    private LoginType loginType;

    /**
     * Get the value of loginType
     *
     * @return the value of loginType
     */
    public LoginType getLoginType() {
        return loginType;
    }

    /**
     * Set the value of loginType
     *
     * @param loginType new value of loginType
     */
    public void setLoginType(LoginType loginType) {
        this.loginType = loginType;
    }
}
