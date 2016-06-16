/*
 * The MIT License
 *
 * Copyright 2015 tightsocial.org.
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
package org.tightsocial.feedbackgleaning.port.adapter.service;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import org.tightsocial.common.sharedcontract.echo.Form;
import org.tightsocial.feedbackgleaning.application.ApplicationService;

/**
 *
 * @author Iven Xu <ivenxu at gmail.com>
 */

@Path("form")
@RequestScoped
public class FormResource {
    
    @Inject
    private ApplicationService applicationService;
     
    @Context
    private UriInfo context;
    
    public FormResource(){
    }
     
    @GET
    @Path("/{formId}")
    @Produces({"application/xml","application/json"})
    public Form getForm(@PathParam("formId") long formId){
        applicationService.xyz();
        Form f = new Form();
        f.setId(formId);
        return f;
    }
}